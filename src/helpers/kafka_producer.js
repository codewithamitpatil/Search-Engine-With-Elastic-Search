import {
    Kafka
} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const producer = kafka.producer({
    createPartitioner: ''
});

const run = async () => {
    // Producing
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [{
            key: 'amit',
            value: 'Hello KafkaJS user!'
        }, ],
    });
}

run().catch((e) => {
    console.log(e.message)
});