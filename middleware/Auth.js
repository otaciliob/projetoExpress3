const jwt = require('jsonwebtoken');
const SENHA = process.env.JWT_PASSWORD;

let autorizado = (req, res, next) => {
    /* let beareartoken = req.headers['authorization'];
    console.log(beareartoken);
    let token = '';
    if (beareartoken && beareartoken.startsWith("Bearer")) {
        token = beareartoken.split(' ')[1];
    }else{ return res.status(403).json({msg: "No Token!"}); } */
    let token = req.session.token;
    try {
        let payload = jwt.verify(token, SENHA);
        req.user = payload;
        return next();
    } catch {
        req.error = "acesso negado";
        req.session.destroy(err => {
            if (err) {
                return res.send('em caso do usuario colocar um token invalido a força');
            }
        });
        return next();
    }
}
let isAdmin = (req, res, next) => {
    if (req.user.admin) {
        return next();
    } else {
        res.status(403).json({msg: "Esta rota eh exclusiva para admin"});
    }
}
module.exports = { autorizado, isAdmin }