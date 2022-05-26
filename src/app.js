import express from 'express';
import cors from 'cors';
import httpErrors from 'http-errors';
import helmet from 'helmet';
import amqp from 'amqplib';

import config from './config/default.js';
import routes from './routes/index.js';



import {
    AddDocument,
    deleteDocumentById,
    deleteDocumentByQuery,
    updateDocument
} from './helpers/elasticSearch.js';


const app = express();

const searchIndex = config.searchIndex;
const autoIndex = config.autoIndex;

// enabel cors
app.use(cors('*'));

// enable helmet security rules
app.use(helmet());


// intialize routes
app.use('', routes);


// add post
app.post('/status', async (req, res, next) => {
    res.send('Elastic service is up and running');
})


// add post, channel,user data to elastic search 
export const SearchDataQueue = async () => {

    const quename = config.quename;
    const connection = await amqp.connect(config.rabitUri);
    const channel = await connection.createChannel();
    const que = await channel.assertQueue(quename, {
        durable: false
    });

    channel.consume(quename, async (msg) => {
        console.log(msg.content.toString());
        let temp = msg.content.toString();
        let data = JSON.parse(temp);

        console.log('action ===', data.action)

        switch (data.action) {
            case 'add':
                delete data.action;
                // add data to elk
                await AddDocument(searchIndex, data.postId, data);
                await AddDocument(autoIndex, data.postId, data);

                break;
            case 'removePost':
                await deleteDocumentByQuery(searchIndex, {
                    postId: data.postId
                });
                await deleteDocumentByQuery(autoIndex, {
                    postId: data.postId
                });
                break;
            case 'removeChannel':
                await deleteDocumentByQuery(searchIndex, {
                    channelId: data.channelId
                });
                await deleteDocumentByQuery(autoIndex, {
                    channelId: data.channelId
                });
                break;
        }


        console.log(data);
        // MailHandler(data);
        channel.ack(msg);
    });


    process.on('exit', (code) => {
        console.log('process exit nde', code);
        connection.close();
    });


}



export default app;
