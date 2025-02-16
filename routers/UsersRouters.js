const router = require("express").Router()
const SENHA = process.env.JWT_PASSWORD; //jwt secrect
const { autorizado, isAdmin } = require("../middleware/Auth");
const jwt = require("jsonwebtoken");

var UserModel = require("../models/User.js");

router.get("/", (req, res) => {
    if (req.session.token) {
        res.redirect('/home');
    } else {
        let args = {
            titulo: "Templates",
            error: req.error
        };
        res.render("home", args);
    }
});
router.get("/home", autorizado, (req, res) => {
    if (req.error) { res.redirect('/'); }
    else {
        let args = {
            titulo: "Home",
            user: req.user,
            isAdmin: req.user.isAdmin
        };
        console.log(args.isAdmin);
        res.render("home", args);
    }
});
/*router.get("/lista", async (req, res) => {
    res.json({ status: true, user: await UserModel.lista() });
});*/
router.post("/signin", async (req, res) => {
    let { nome, senha } = req.body;
    if (nome && senha) {
        let user = await UserModel.buscaPorNome(nome, senha)
        if (user) {
            let payload = { user: user.id, isAdmin: user.isAdmin };
            let config = { expiresIn: '15 min' };
            let token = jwt.sign(payload, SENHA, config);
            req.session.token = token;
            res.redirect("/home");
        }else{res.redirect("/");}
    } else {
        res.redirect("/");
    }

});//login
router.get("/signup", (req, res) => {
    if (req.session.token) {
        res.redirect('/home');
    } else {
        res.render("cadastro", { titulo: "Cadastrar" })
    }
});
router.post("/signup", async (req, res) => {
    let { nome, senha } = req.body;
    if (nome && senha) {
        res.json({ status: true, user: await UserModel.novo(nome, senha, false) })
    } else {
        res.redirect('/signup');
    }
});//cadastro
router.get("/signout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Erro ao encerrar a sessão.');
        }
        res.redirect('/');
    });
});//logout

module.exports = router;