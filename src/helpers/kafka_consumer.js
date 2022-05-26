import kafka from './KafkaClient.js';
import config from '../config/default.js';
import {
    doTask
} from './elasticActions.js';

const consumer = kafka.consumer({
    groupId: 'search-group',
});


export const Subscribe = async (topic = config.kafkaTopic) => {
    console.log('listening for messages');

    await consumer.connect()
    await consumer.subscribe({
        topics: [topic],
        fromBeginning: true,
    })

    await consumer.run({
        eachMessage: async ({
            topic,
            partition,
            message
        }) => {
            let temp = JSON.parse(message.value.toString());
            //  console.log(temp);
            await doTask(temp);
        },
    })

}