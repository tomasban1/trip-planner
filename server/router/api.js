import express from 'express';
import { locationsApiRouter } from './locations/locations.js';
import { registerApirouter } from './register/register.js';
import { loginApirouter } from './login/login.js';

export const apiRouter = express.Router();

apiRouter.use('/locations', locationsApiRouter);
apiRouter.use('/register', registerApirouter);
apiRouter.use('/login', loginApirouter);

apiRouter.all('*', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Nurodyk konkretu api endpointa'
    });
})
