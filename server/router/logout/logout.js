import express from 'express';
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';
import { connection } from '../../db.js';
import { env } from '../../env.js';

export const logoutApirouter = express.Router();

logoutApirouter.get('/', getLogout);


logoutApirouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'Toks HTTP metodas api/login nepalaikomas',
    })
});

const tokenLength = 20
// async function getLogout(req, res) {

//     return res.json({
//         isLoggedIn: req.user.isLoggedIn,
//     });
// }

async function getLogout(req, res) {

    if (!req.cookies.loginToken) {
        return res.json({
            status: 'error',
            msg: 'Neegzistuojanciu sesiju neatjunginejame',
        });
    }

    try {
        const sql = 'DELETE FROM tokens WHERE token = ?;';
        const result = await connection.execute(sql, [req.cookies.loginToken]);



        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti atsijungimo proceso, pabandykite veliau',
        });
    }

    const cookie = [
        'loginToken=' + req.cookies.loginToken,
        'path=/',
        'domain=localhost',
        `max-age=-1`,
        'SameSite = Lax',
        'HttpOnly',
    ]

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Atsijungta sekmingai.',
        });


}

