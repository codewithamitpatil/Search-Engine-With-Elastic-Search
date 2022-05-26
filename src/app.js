import express from 'express';
import cors from 'cors';
import httpErrors from 'http-errors';
import helmet from 'helmet';





const app = express();



// enabel cors
app.use(cors('*'));

// enable helmet security rules
app.use(helmet());


// add post
app.post('/status', async (req, res, next) => {
    res.send('Elastic service is up and running');
})




export default app;
