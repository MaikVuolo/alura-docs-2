import jwt from "jsonwebtoken";

function gerarToken( payload ){
    const token = jwt.sign(payload , process.env.SEGREDO_TOKEN, {
        expiresIn: "1h"
    })
    return token;
}

export default gerarToken;