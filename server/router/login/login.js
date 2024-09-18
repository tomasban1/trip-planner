import express from 'express';
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';
import { connection } from '../../db.js';

export const loginApirouter = express.Router();

loginApirouter.post('/', postLogin);
loginApirouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'Toks HTTP metodas api/login nepalaikomas',
    })
});

async function postLogin(req, res) {
    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null

    ) {
        return res.json({
            status: 'error',
            msg: 'Pagrindinis duomenu tipas turi buti objektas.',
        });
    }

    const requiredFields = ['username', 'password'];
    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.json({
            status: 'error',
            msg: 'Objekto ilgis turi buti 2.',
        });
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username);
    if (usernameError) {
        return res.json({
            status: 'error',
            msg: usernameError,
        });
    }

    const passwordError = isValidPassword(password);
    if (passwordError) {
        return res.json({
            status: 'error',
            msg: passwordError,
        });
    }

    let userData = null;
    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?;';
        const result = await connection.execute(sql, [username, password]);


        if (result[0].length !== 1) {
            return res.json({
                status: 'error',
                msg: 'Kilo problemu su vartotojo paskyra, susisiekite su client support',
            });
        }
        userData = result[0][0];

    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti prisijungimo proceso, pabandykite veliau',
        });
    }

    const abc = 'ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let token = '';
    for (let i = 0; i < 20; i++) {
        token += abc[Math.floor(Math.random() * abc.length)];
    }

    console.log(token);


    try {
        const sql = 'INSERT INTO tokens (token, user_id) VALUES (?, ?);';
        const result = await connection.execute(sql, [token, userData.id]);



        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti prisijungimo proceso, pabandykite veliau',
        });
    }

    const cookie = [
        'loginToken=' + token,
        'path=/',
        'domain=localhost',
        'max-age=86400',
        'SameSite = Lax',
        'HttpOnly',
    ]

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Prisijungta sekmingai.',
        });


}

