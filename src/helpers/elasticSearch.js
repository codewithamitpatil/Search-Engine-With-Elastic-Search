import config from '../config/default.js';
import {
    Client,
} from '@elastic/elasticsearch';

const searchIndex = config.searchIndex;
const autoIndex = config.autoIndex;

export const esclient = new Client(config.elasticConfig);


// check connection
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

// auto complete index
export async function createAutoCompleteIndex(index) {
    try {
        await esclient.indices.create({
            index,
            body: {
                settings: {
                    analysis: {
                        analyzer: {
                            indexing_analyzer: {
                                tokenizer: 'whitespace',
                                filter: ["lowercase", "edge_ngram_filter"]
                            },
                            search_analyze: {
                                tokenizer: 'whitespace',
                                filter: 'lowercase'
                            }
                        },
                        filter: {
                            edge_ngram_filter: {

                                type: 'edge_ngram',
                                min_gram: 3,
                                max_gram: 15
                            }
                        }
                    },

                },
                mappings: {
                    dynamic: 'strict',
                    properties: {
                        title: {
                            type: "text",
                            analyzer: 'indexing_analyzer',
                            search_analyzer: "search_analyze"
                        },
                        description: {
                            type: "text",
                            analyzer: 'indexing_analyzer',
                            search_analyzer: "search_analyze"
                            //   analyzer: 'whitespace'
                        },
                        postId: {
                            type: "text"
                        },
                        channelId: {
                            type: "text"
                        },
                        thumbnail: {
                            type: "text"
                        },
                        channelLogo: {
                            type: "text"
                        },
                        createdTime: {
                            type: "text"
                        },
                        channelName: {
                            type: "text",
                            analyzer: 'indexing_analyzer',
                            search_analyzer: "search_analyze"
                        },
                        channelDesc: {
                            type: "text",
                            analyzer: 'indexing_analyzer',
                            search_analyzer: "search_analyze"
                        },
                        isPost: {
                            type: "boolean"
                        }

                    }
                }
            }
        });
        console.log(`Created index ${index}`);
        return true;
    } catch (err) {
        console.error(`An error occurred while 
        creating the auto complete index ${index}:`);
        console.error(err);
        return err;
    }
}

// search index
export async function createSearchIndex(index) {
    try {
        await esclient.indices.create({
            index,
            body: {
                mappings: {
                    dynamic: 'strict',
                    properties: {
                        title: {
                            type: "text",
                            //   analyzer: 'whitespace',
                            //  search_analyzer: 'simple'
                        },
                        description: {
                            type: "text",
                            //   analyzer: 'whitespace'
                        },
                        postId: {
                            type: "text"
                        },
                        channelId: {
                            type: "text"
                        },
                        thumbnail: {
                            type: "text"
                        },
                        channelLogo: {
                            type: "text"
                        },
                        createdTime: {
                            type: "text"
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

                    }
                }
            }
        });
        console.log(`Created search index ${index}`);
        return true;
    } catch (err) {
        console.error(`An error occurred while creating the search index ${index}:`);
        console.error(err);
        return err;
    }
}


// get all indices
export async function getIndexes() {
    const indexes = await esclient.cat.indices({
        format: 'json'
    })
    console.log(indexes)
}

// delete indices
export async function removeIndexes(index) {
    try {
        const indexes = await esclient.indices.delete({
            index
        })
        console.log(indexes)
    } catch (e) {
        console.log('index is deleted successfully')
    }

}

// insert document 
export const AddDocument = async (index, id, body) => {
    const temp = await esclient.index({
        index,
        id,
        body
    });
    console.log(temp)
    return temp;
};


// get All documents
export const getAllDocumentsByIndex = async (index) => {
    const temp = await esclient.search({
        index,
        query: {
            match_all: {}
        }
    })
    console.log(temp.hits.hits);
    return temp;
}

const obj = {
    title: 'sumit is greate',
    description: 'sorry for that',
    postId: '6280117d192027b615b84545',
    channelId: '6280117d192027b615b84545',
    thumbnail: '',
    channelLogo: '',
    createdTime: '3-3-200',
    channelName: 'amitcode',
    channelDesc: 'superub',
    isPost: true
}


// update document by id
export const updateDocument = async (index, id, query) => {
    const temp = await esclient.update({
        index,
        id: id,
        doc: query,
    });
    console.log(temp)
    return temp;
}


// to search all documents in elastic search index
export const searchDocuments = async (index, query) => {

    const body = await esclient.search({
        index,
        body: {
            query: {
                match: query
            }
        }
    })

    const temp = body.hits.hits.map((item) => {
        const obj = {
            ...item._source,
            _id: item._id
        }
        return obj;
    })
    console.log(temp)
    return temp;
}


// for auto complete
//medium.com/@deeshugupta/autocomplete-using-elasticsearch-and-nodejs-e48a3901973f
export const autoComplete = async (index, query, fields) => {

    const body = await esclient.search({
        index,
        body: {
            // from: 1,
            // size: 2,
            query: {
                multi_match: {
                    query,
                    fields
                },
            },
        }
    })

    const temp = body.hits.hits.map((item) => {
        const obj = {
            ...item._source,
            _id: item._id
        }
        return obj;
    })
    console.log(temp)
    return temp;
}

// delete by particular field
export const deleteDocumentByQuery = async (index, query) => {
    try {
        const data = await esclient.deleteByQuery({
            index,
            query: {
                match: query
            }
        })
        console.log(data)
        return true;
    } catch (e) {
        console.log(e.message)
        return e;
    }

}


// delete by elastic search id
export const deleteDocumentById = async (index, id) => {
    try {

        // id - id of elastic document
        const temp = await esclient.delete({
            index,
            id
        });
        console.log(temp)
        return true;
    } catch (e) {
        console.log(e.message)
    }

}

//deleteDocumentById(searchIndex, obj.postId)

// deleteDocumentByQuery(autoIndex, {
//     postId: obj.postId
// })
// autoComplete(
//     autoIndex, 'sumi', ["title", "channel", "description"]
// )
// searchDocuments(searchIndex, {
//     title: 'is'
// })
//UpdateDocument(searchIndex, obj.postId, obj)
//AddDocument(autoIndex, obj.postId, obj)
//removeIndexes('postsearch')

//getIndexes()
getAllDocumentsByIndex(searchIndex)
//