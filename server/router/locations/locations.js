import express from 'express';
import { connection } from '../../db.js';

console.log(connection);



export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', getLocations);

async function getLocations(req, res) {
    const sql = 'SELECT * FROM locations;';

    let dataFromServer = null;

    try {
        dataFromServer = await connection.execute(sql);
        console.log(connection._fatalError);
    } catch (error) {
        console.log(connection.connection._fatalError);

        dataFromServer = [[]];

    }

    return res.json({
        status: 'success',
        data: dataFromServer[0],
    });

}   