import config from './config/default.js';
import {
    checkConnection,
    createSearchIndex,
    esclient,
    createAutoCompleteIndex
} from './helpers/elasticSearch.js';

import app, {
    SearchDataQueue

} from './app.js';

const port = config.port;
const autoIndex = config.autoIndex;
const searchIndex = config.searchIndex;


const ElasticEnv = async () => {

    try {

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

            // start server
            server();

        }

    } catch (e) {
        console.log(e)
    }
}


ElasticEnv();

// main express server
const server = () => {
    app.listen(port, () => {
        SearchDataQueue();
        console.log(`Elastic Search Service Is Listening on port :: ${port}`)
    });
}