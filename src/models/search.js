import config from '../config/default.js';
import {
    Client,
} from '@elastic/elasticsearch';


export const esclient = new Client(config.elasticConfig);


export const index = "post3";
export const type = "post3";

export async function createIndex(index) {
    try {
        await esclient.indices.create({
            index
        });
        console.log(`Created index ${index}`);
    } catch (err) {
        console.error(`An error occurred while creating the index ${index}:`);
        console.error(err);
    }
}

export async function setPostMapping() {
    try {
        const schema = {
            title: {
                type: "text"
            },
            description: {
                type: "text"
            },
            postId: {
                type: "string"
            },
            channelId: {
                type: "string"
            },
            thumbnail: {
                type: "string"
            },
            channelLogo: {
                type: "string"
            },
            createdTime: {
                type: "string"
            },
            channelName: {
                type: "text"
            },
            channelDesc: {
                type: "text"
            },
            isPost: {
                type: "boolean"
            }

        };

        await esclient.indices.putMapping({
            index: index,
            type: type,
            body: {
                properties: schema
            }
        })

        console.log("Post mapping created successfully");
    } catch (err) {
        console.error("An error occurred while setting the quotes mapping:");
        console.error(err);
    }
}



export function checkConnection() {
    return new Promise(async (resolve) => {
        console.log("Checking connection to ElasticSearch...");
        let isConnected = false;
        while (!isConnected) {
            try {
                await esclient.cluster.health({});
                console.log("Successfully connected to ElasticSearch");
                isConnected = true;
                // eslint-disable-next-line no-empty
            } catch (_) {}
        }
        resolve(true);
    });
}

// module.exports = {
//     esclient,
//     setPostMapping,
//     checkConnection,
//     createIndex,
//     index,
//     type
// };