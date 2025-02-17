const router = require("express").Router()
const { autorizado, isAdmin } = require("../middleware/Auth");

var IngressoModel = require("../models/Ingresso");
var UserModel = require("../models/User.js");

router.get("/",autorizado,isAdmin, (req, res) => {
    let args = {
        titulo: "Administração",
    };
    res.render("admin",args)
});
router.get("/user",autorizado,isAdmin, async(req, res) => {
    let args = {
        titulo: "Administração",
        usuarios: true,
    };
    res.render("admin",args)
});
router.get("/ingresso",autorizado,isAdmin,(req,res)=>{
    let args = {
        titulo: "Administração",
        ingressos: true,
    };
    res.render("admin",args)
})
router.post("/user/create",autorizado,isAdmin,async(req,res)=>{
    let { nome, senha, isAdmin } = req.body;
    if (isAdmin == undefined) {
        isAdmin = false;
    }
    if (nome && senha) {
        res.json({ status: true, user: await UserModel.novo(nome, senha, isAdmin) })
        res.redirect('/admin/user');
    } else {
        res.redirect('/admin/user');
    }
});
router.post("/ingresso/create",autorizado,isAdmin, async(req, res) => {
    let { nome, preco, quantidade } = req.body;
    try {
        let ingresso = await IngressoModel.novo(nome, preco, quantidade)
        //res.json({ status: true, message: ingresso });
        res.redirect('/admin');
    } catch (error) {
        res.json({ status: false, message: error });
    }
});
router.put("/ingresso/:id",autorizado,isAdmin, async(req, res) => {
    let { nome, preco, quantidade } = req.body;
    let id = req.params.id;
    try {
        let ingresso =await IngressoModel.alterar({ id, nome, preco, quantidade })
        //res.json({ status: true, message: ingresso});
        res.redirect('/admin');
    } catch (error) {
        res.json({ status: false, message: error });
    }

});
router.delete("/ingresso/delete/:id",autorizado,isAdmin, async(req, res) => {
    let {id} = req.params;
    //console.log(id);
    if (id) {
        try {
            let ingresso = await IngressoModel.apagar(id)
            //res.json({ status: true, message: ingresso });
            res.redirect('/admin');
        } catch (error) {
            res.status(304).json(error);
        }
    }
});

module.exports = router;