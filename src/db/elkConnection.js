import {
    Client,
} from '@elastic/elasticsearch';

import config from '../config/default.js';


const elasticClient = new Client(config.elasticConfig);

elasticClient.info()
    .then(response => {
        // console.log(response)
        console.log('Elastic Search is Connected');
    })
    .catch(error => console.error(error))

export default elasticClient;
// hello 