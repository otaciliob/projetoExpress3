const router = require("express").Router()
const SENHA = process.env.JWT_PASSWORD; //jwt secrect
const {autorizado, isAdmin} = require("../middleware/Auth");

var UserModel = require("../models/User.js");

router.get("/",(req,res)=>{
    let args = {
        titulo: "Templates"
    };
    res.render("home",args);
});

router.get("/lista", async(req, res) => {
    res.json({status: true, user: await UserModel.lista()});
});

router.post("/",(req, res) => {
    let {nome, senha} = req.body;
    res.json({status: true, user: UserModel.novo(nome, senha, false)})
});

router.post("/signin",(req,res)=>{
    let { nome, senha } = req.body;
    let user = UserModel.buscaPorNome(nome,senha)

    if (user) {
        let payload = { user: user.id, admin: user.isAdmin };
        let config = { expiresIn: '15 min' };
        let token = jwt.sign(payload, SENHA, config);
        res.json({ token });
    }else{res.status(400).json('User Not Found')}

});//login
router.post("/signup",(req,res)=>{});//cadastro

module.exports = router;