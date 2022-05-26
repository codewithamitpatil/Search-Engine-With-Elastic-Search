import express from 'express';
import cors from 'cors';
import httpErrors from 'http-errors';
import helmet from 'helmet';
import amqp from 'amqplib';

import config from './config/default.js';



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


// add post
app.post('/status', async (req, res, next) => {
    res.send('Elastic service is up and running');
})




export default app;
