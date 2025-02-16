const router = require("express").Router()
const { autorizado, isAdmin } = require("../middleware/Auth");

var IngressoModel = require("../models/Ingresso");
var UserModel = require("../models/User.js");

router.get("/", (req, res) => {
    let args = {
        titulo: "Administração",
        error: req.error
    };
    res.render("admin",args)
});
router.post("/user/create",autorizado,isAdmin,async(req,res)=>{
    let { nome, senha, isAdmin } = req.body;
    if (nome && senha) {
        res.json({ status: true, user: await UserModel.novo(nome, senha, isAdmin) })
    } else {
        res.redirect('/admin');
    }
});
router.delete("/user/:id",autorizado,isAdmin,async(req,res)=>{
    let {id} = req.params;
    if(id){
        try {
            const result = await UserModel.apagar(id)
            res.redirect('/admin');
        } catch (error) {
            res.status(304).json(error);
        }
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
router.delete("/ingresso/:id",autorizado,isAdmin, async(req, res) => {
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