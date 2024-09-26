import express from 'express';
import { connection } from '../../db.js';
import { isNonEmptyString } from '../../lib/isValid.js';



export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', getLocations);
locationsApiRouter.post('/', postLocations);

async function getLocations(req, res) {
    const sql = `
        SELECT name, img, country, city, street, number, zip 
            FROM locations 
            INNER JOIN adress 
            ON adress.id = locations.adress_id;`;

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

async function postLocations(req, res) {
    const { name, img, country, city } = req.body;
    let { street, number, zip } = req.body;

    const validName = isNonEmptyString(name);
    const validImg = isNonEmptyString(img);
    const validCountry = isNonEmptyString(country);
    const validCity = isNonEmptyString(city);
    const validStreet = isNonEmptyString(street);
    const validNumber = isNonEmptyString(number);
    const validZip = isNonEmptyString(zip);

    if (!validName || !validImg || !validCountry || !validCity) {
        return res.json({
            status: 'error',
            data: 'Truksta privalomios informacijos',
        });
    }

    if (!validStreet) {
        street = '';
    }
    if (!validNumber) {
        number = '';
    }
    if (!validZip) {
        zip = '';
    }

    let addressId = 0;
    try {
        const sql = 'SELECT * FROM adress WHERE country = ? AND city = ? AND street = ? AND number = ? AND zip = ?';
        const [responseData] = await connection.execute(sql, [country, city, street, number, zip]);

        if (responseData.length === 1) {
            addressId = responseData[0].id
        }

    } catch (error) {
        return res.json({
            status: 'error',
            data: 'Nepavyko sukurti lokacijos iraso',
        });
    }

    if (addressId === 0) {
        try {
            const sql = 'INSERT INTO adress (country, city, street, number, zip) VALUE (?, ?, ?, ?, ?);';
            const [insertResult] = await connection.execute(sql, [country, city, street, number, zip]);
            if (insertResult.affectedRows === 1) {
                addressId = insertResult.insertId
            }

        } catch (error) {
            return res.json({
                status: 'error',
                data: 'Nepavyko sukurti lokacijos iraso',
            });
        }
    }



    try {
        const sql = 'INSERT INTO locations (name, img, adress_id) VALUES (?, ?, ?);';
        const [insertResponse] = await connection.execute(sql, [name, img, addressId]);

        if (insertResponse.affectedRows !== 1) {
            addressId = responseData.id
            return res.json({
                status: 'error',
                data: 'Nepavyko sukurti lokacijos iraso',
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            data: 'Nepavyko sukurti lokacijos iraso',
        });
    }

    return res.json({
        status: 'success',
        data: 'Nauja lokacija uzregistruota',
    });

}