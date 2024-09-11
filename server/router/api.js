import express from 'express';
import { locationsApiRouter } from './locations/locations.js';

export const apiRouter = express.Router();

apiRouter.use('/locations', locationsApiRouter);

apiRouter.all('*', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Nurodyk konkretu api endpointa'
    });
})
