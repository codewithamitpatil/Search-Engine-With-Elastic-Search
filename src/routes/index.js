import express from 'express';
import {
    searchDocuments,
    autoComplete
} from '../helpers/elasticSearch.js';

import config from '../config/default.js';

const routes = express.Router();


// to search
routes.get('/search', async (req, res, next) => {
    try {
        //      let fields = ["title", "channel", "description"];
        let data = await searchDocuments(config.searchIndex, {
            title: req.query.q
        });
        return res.send(data);
    } catch (e) {
        return next(e);
    }
});

// to autocomplete
routes.get('/autocomplete', async (req, res, next) => {
    try {
        let fields = ["title", "channel", "description"];
        let data = await autoComplete(config.searchIndex, req.query.auto, fields);
        return res.send(data);
    } catch (e) {
        return next(e);
    }
});


// export
export default routes;