import {
    AddDocument,
    deleteDocumentByQuery
} from "./elasticSearch.js";

import config from '../config/default.js';


export const doTask = async (data) => {


    console.log('action ===', data.action)

    switch (data.action) {
        case 'add':
            delete data.action;
            // add data to elk
            await AddDocument(config.searchIndex, data.postId, data);
            await AddDocument(config.autoIndex, data.postId, data);

            break;
        case 'removePost':
            await deleteDocumentByQuery(config.searchIndex, {
                postId: data.postId
            });
            await deleteDocumentByQuery(config.autoIndex, {
                postId: data.postId
            });
            break;
        case 'removeChannel':
            await deleteDocumentByQuery(config.searchIndex, {
                channelId: data.channelId
            });
            await deleteDocumentByQuery(config.autoIndex, {
                channelId: data.channelId
            });
            break;
    }


}