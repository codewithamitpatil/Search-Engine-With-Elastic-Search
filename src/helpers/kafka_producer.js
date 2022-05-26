import {
    CompressionTypes
} from 'kafkajs';

import kafka from "./KafkaClient.js";
import config from '../config/default.js';

const producer = kafka.producer({
    allowAutoTopicCreation: false,
});


// publish
const Publish = async (message, topic = config.kafkaTopic) => {
    // Producing
    await producer.connect();
    const temp = await producer.send({
        topic: topic,
        compression: CompressionTypes.GZIP,
        messages: message,
    });

    console.log(temp)
}




const temp1 = async () => {

    for (let i = 0; i < 4; i++) {


        const obj = {
            title: `amit is grate ${i}`,
            description: 'sorry for that',
            postId: '6280117d192027b615b84545',
            channelId: '6280117d192027b615b84545',
            thumbnail: '',
            channelLogo: '',
            createdTime: '3-3-200',
            channelName: 'amitcode',
            channelDesc: 'superub',
            isPost: true,
            action: 'add',
        }


        await Publish([{
            key: obj.postId,
            value: JSON.stringify(obj)
        }]);

    }
}

//temp1()

export default Publish;