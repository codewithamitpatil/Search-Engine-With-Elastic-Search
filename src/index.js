import config from './config/default.js';
import {
    checkConnection,
    createSearchIndex,
    esclient,
    createAutoCompleteIndex,
    getIndexes,
    searchDocuments,
    getAllDocumentsByIndex
} from './helpers/elasticSearch.js';

import app, {
    SearchDataQueue
} from './app.js';

import Publish from './helpers/kafka_producer.js';

import {
    Subscribe
} from './helpers/kafka_consumer.js';

import {
    createTopic
} from './helpers/KafkaClient.js';

const port = config.port;
const autoIndex = config.autoIndex;
const searchIndex = config.searchIndex;
const kafkatopic = config.kafkaTopic;


//KafkaConfig();

const ElasticEnv = async () => {

    try {
        console.log('Starting elastic env')
        const isElasticReady = await checkConnection();

        if (isElasticReady) {

            const elasticAutoIndex = await esclient.indices.exists({
                index: autoIndex
            });

            if (!elasticAutoIndex) {

                await createAutoCompleteIndex(autoIndex);
            } else {
                console.log('AutoComplete Index Is already Present')
            }


            const elasticSearchIndex = await esclient.indices.exists({
                index: searchIndex
            });

            if (!elasticAutoIndex) {
                await createSearchIndex(searchIndex);
            } else {
                console.log('Search Index Is already Present')
            }

         server();
       
        }

    } catch (e) {
        console.log(e)
    }
}

// main express server
const server = () => {
    app.listen(port, async () => {
        // start listening
           SearchDataQueue();
        console.log(`Elastic Search Service Is Listening on port :: ${port}`)
    });
}


// start elastic
ElasticEnv();
