import {
    Kafka,
    logLevel
} from 'kafkajs';
import winston from 'winston';
import logger from './logger.js';
import config from '../config/default.js';


// config for cutom kafka logger
const toWinstonLogLevel = level => {
    switch (level) {
        case logLevel.ERROR:
        case logLevel.NOTHING:
            return 'error'
        case logLevel.WARN:
            return 'warn'
        case logLevel.INFO:
            return 'info'
        case logLevel.DEBUG:
            return 'debug'
    }
}


const WinstonLogCreator = logLevel => {
    const logger = winston.createLogger({
        level: toWinstonLogLevel(logLevel),
        transports: [
            new winston.transports.Console(),
        ]
    })

    return ({
        namespace,
        level,
        label,
        log
    }) => {
        const {
            message,
            ...extra
        } = log
        logger.log({
            level: toWinstonLogLevel(level),
            message,
            extra,
        })
    }
}


// kafka client
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['pkc-l7pr2.ap-south-1.aws.confluent.cloud:9092'],
    //  enforceRequestTimeout: false,
    ssl: true,
    sasl: config.kafka_sasl,
    // retry: {
    //     initialRetryTime: 100,
    //     retries: 8
    // },
    connectionTimeout: 45000,
    logLevel: logLevel.ERROR,
    logCreator: WinstonLogCreator,


});


// to create new topic
export const createTopic = async (kafkaTopic) => {

    const admin = kafka.admin();
    await admin.connect();

    // fetch topic meta 
    const isTopicExists = await admin.fetchTopicMetadata({
        topics: [kafkaTopic]
    }).catch((e) => {
        return false;
    });


    if (!isTopicExists) {
        const data = await admin.createTopics({
            validateOnly: true,
            waitForLeaders: true,
            topics: [{
                topic: kafkaTopic,
                numPartitions: 4
            }]
        });
        console.log('Topic is created successfully', config.kafkaTopic)
        return true;
    } else {
        console.log('Topic is alreday exists')
        return true;
    }

}

// get topic list
export const getTopics = async () => {
    const admin = kafka.admin();
    await admin.connect();
    const data = await admin.listTopics();
    console.log(data);
}


// export kafka connection
export default kafka;





// const removeTopic = async (topics) => {

//     const admin = kafka.admin();
//     await admin.connect();

//     const data = await admin.deleteTopics({
//         topics: topics,
//         ///   timeout: 5000
//     });

//     console.log(data);

// }


// removeTopic('searchtopic')
//getTopics()
//createTopic('sample');