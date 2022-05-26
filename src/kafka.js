import {
    SchemaRegistry,
    SchemaType,
} from '@kafkajs/confluent-schema-registry';

import config from './config/default.js';
import kafka from "./helpers/KafkaClient.js";

import Publish from "./helpers/kafka_producer.js";

import {
    Subscribe
} from "./helpers/kafka_consumer.js";

import {
    createTopic,
    getTopics,

} from './helpers/KafkaClient.js';

import {
    checkConnection,
    createSearchIndex,
    esclient,
    createAutoCompleteIndex,
    getIndexes,
    searchDocuments,
    getAllDocumentsByIndex
} from './helpers/elasticSearch.js';


//getAllDocumentsByIndex('autoindex')

const bootstrap_kafka = async () => {
    // await Publish([{
    //     key: '3',
    //     value: JSON.stringify({
    //         name: "samit patil",
    //         id: 44
    //     })
    // }]);


    for (let i = 1; i < 10; i++) {
        let temp = i.toString();

        // await Publish([{
        //     key: temp,
        //     value: JSON.stringify({
        //         title: "samit is one of the patil",
        //         age: 56,
        //         id: i,
        //         uid: 1
        //     })
        // }], "posts")

        //     await Publish([{
        //         key: temp,
        //         value: JSON.stringify({
        //             name: "samit is one of the patil",
        //             age: 56,
        //             id: i
        //         })
        //     }], "users")
        // }



        //Subscribe('posts');
        // getTopics()
    }
    Subscribe('posts');
}
//bootstrap_kafka();