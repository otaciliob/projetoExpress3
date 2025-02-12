const router = require("express").Router()
const SENHA = process.env.JWT_PASSWORD; //jwt secrect
const {autorizado, isAdmin} = require("../middleware/Auth");

var UserModel = require("../models/User.js");

router.get("/",(req,res)=>{
    let args = {
        titulo: "Templates"
    };
    res.render("home",args);
})
router.get("/lista", async(req, res) => {
    res.json({status: true, user: await UserModel.lista()});
})
router.post("/",(req, res) => {
    let {nome, senha, admin} = req.body;
    res.json({status: true, user: UserModel.novo(nome, senha, admin)})
})
module.exports = router;