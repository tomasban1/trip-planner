import { connection } from "../db.js";
import { env } from "../env.js";

const tokenLength = 20;

export async function userDetails(req, res, next) {
    req.user = {
        role: 'public',
        isLoggedIn: false,
        username: '',

    }

    const { cookies } = req;

    if (typeof cookies.loginToken === 'string'
        && cookies.loginToken.length === tokenLength) {

        try {

            const sql = `
                SELECT
                    users.username,
                    users.role,
                    users.created_at AS user_created_at,
                    tokens.created_at AS token_created_at
                FROM tokens 
                INNER JOIN users ON tokens.user_id = users.id
                WHERE token = ? AND tokens.created_at >= ?;`;
            const deadLine = new Date(Date.now() - env.COOKIE_MAX_AGE * 1000)
            const [selectResult] = await connection.execute(sql, [cookies.loginToken, deadLine]);

            if (selectResult.length === 1) {
                req.user.isLoggedIn = true;
                req.user.role = selectResult[0].role;
                req.user.username = selectResult[0].username;
            }



            // kitas sprendimas cookie galiojimo datai patikrinti
            // const date = selectResult[0].created_at;
            // const now = Date.now()

            // if ((date.getTime() + env.COOKIE_MAX_AGE * 1000) < now) {
            //     return res.json({
            //         isLoggedIn: false,
            //     });
            // }


        } catch (error) {
            console.log(error);

        }
    }

    next();
}