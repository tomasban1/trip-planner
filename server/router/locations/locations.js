import express from 'express';
import { connection } from '../../db.js';

console.log(connection);



export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', getLocations);

async function getLocations(req, res) {
    const data = [
        {
            img: '/',
            name: 'Menulis',
            adress: {
                country: 'Cosmos',
                city: 'A',
                street: 'A',
                number: 'A',
                zip: 'A',
            },
        },
        {
            img: '/',
            name: 'Gele',
            adress: {
                country: 'Dziungles',
                city: 'B',
                street: 'B',
                number: 'B',
                zip: 'B',
            },
        },
        {
            img: '/',
            name: 'Meduza',
            adress: {
                country: 'Baltijos jura',
                city: 'C',
                street: 'C',
                number: 'C',
                zip: 'C',
            },
        },
    ]

    const sql = 'SELECT * FROM locations;';
    const dataFromServer = await connection.execute(sql);


    return res.json({
        status: 'success',
        data: dataFromServer[0],
    });

}  