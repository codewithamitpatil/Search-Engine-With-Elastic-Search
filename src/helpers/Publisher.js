import amqp from 'amqplib';
import config from '../config/default.js';

const uri = config.rabitUri;
console.log(uri)

const Publish = async (quename, message) => {
    const connection = await amqp.connect(uri);
    const channel = await connection.createChannel();
    const que = await channel.assertQueue(quename, {
        durable: false
    });
    channel.sendToQueue(quename, Buffer.from(JSON.stringify(message)));
    console.log('message sent')
    setTimeout(() => {
        connection.close();
        console.log('connection closed');
    }, 1000);
}

Publish(config.quename, {
    action: 'add',
    title: 'hello sumit',
    description: 'amit is one of the grate',
    postId: '6280117d192027b615b84545',
    channelId: '6280117d192027b615b84545',
    thumbnail: 'http:///locakd k de',
    channelLogo: 'http://localhost:e333',
    channelName: 'suk amit',
    createdTime: '3-33-200',
    channelDesc: 'aa',
    isPost: false
})

// Publish(config.quename, {
//     action: 'add',
//     title: 'hello vaishanvi',
//     description: 'amit is one of the grate',
//     postId: 8,
//     channelId: 6,
//     thumbnail: 'http:///locakd k de',
//     channelLogo: 'http://localhost:e333',
//     channelName: 'suk amit',
//     createdTime: '3-33-200',
//     isPost: false
// })
// Publish(config.quename, {
//     action: 'add',
//     title: 'hello surkeka',
//     description: 'amit is one of the grate',
//     postId: 123,
//     channelId: 6,
//     thumbnail: 'http:///locakd k de',
//     channelLogo: 'http://localhost:e333',
//     channelName: 'suk amit',
//     createdTime: '3-33-200',
//     isPost: false
// })
// Publish(config.quename, {
//     action: 'add',
//     title: 'hello surkerrrka',
//     description: 'amit is one of the grate',
//     postId: 623,
//     channelId: 6,
//     thumbnail: 'http:///locakd k de',
//     channelLogo: 'http://localhost:e333',
//     channelName: 'suk amit',
//     createdTime: '3-33-200',
//     isPost: false
// })


// Publish(config.quename, {
//     action: 'removePost',
//     postId: 123,
// })
Publish(config.quename, {
    action: 'removeChannel',
    channelId: 6,
})
export default Publish;