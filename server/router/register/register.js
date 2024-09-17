import express from 'express';
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';
import { connection } from '../../db.js';

export const registerApirouter = express.Router();

registerApirouter.post('/', postRegister);
registerApirouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'Toks api metodas /api/register nepalaikomas',
    })
});

async function postRegister(req, res) {
    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null

    ) {
        return res.json({
            status: 'error',
            data: 'Pagrindinis duomenu tipas turi buti objektas.',
        });
    }

    const requiredFields = ['username', 'password'];
    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.json({
            status: 'error',
            data: 'Objekto ilgis turi buti 2.',
        });
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username);
    if (usernameError) {
        return res.json({
            status: 'error',
            data: usernameError,
        });
    }

    const passwordError = isValidPassword(password);
    if (passwordError) {
        return res.json({
            status: 'error',
            data: passwordError,
        });
    }

    try {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?);';
        const result = await connection.execute(sql, [username, password]);
        console.log(result);


        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                data: 'Uzsiregistruoti nepavyko, nes toks vartotojas jau yra.',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            data: 'Del techniniu kliuciu nepavyko ivykdyti registracijos proceso, pabandykite veliau',
        });
    }

    return res.json({
        status: 'success',
        data: 'Registracija sekminga.',
    });


}

