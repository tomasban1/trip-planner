import express from 'express';

export const apiRouter = express.Router();

apiRouter.all('*', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Nurodyk konkretu api endpointa'
    });
})