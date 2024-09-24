import express from 'express';
import { locationsApiRouter } from './locations/locations.js';
import { registerApirouter } from './register/register.js';
import { loginApirouter } from './login/login.js';
import { logoutApirouter } from './logout/logout.js';

export const apiRouter = express.Router();


apiRouter.use('/register', registerApirouter);
apiRouter.use('/login', loginApirouter);
apiRouter.use('/logout', logoutApirouter);
apiRouter.use('/locations', locationsApiRouter);

apiRouter.all('*', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Nurodyk konkretu api endpointa'
    });
})
