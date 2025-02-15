const {Compra} = require('./DB');

module.exports = {
    novo: async(user,ingresso) =>{
        return await Compra.create({UserId: UserModel, IngressoId: ingresso});
    },
    listarPorUsuario: async (id)=>{
        return await Compra.findAll({where:{
            UserId: id
        }});
    },
    listarTudo: async ()=>{
        return await Compra.findAll();
    },
    busca: async ()=>{
        return await Compra.findByPk(id);
    },
    alterar: async(compra)=>{
        return await Compra.update(compra,{where: ingresso.id });
    },
    apagar: (id)=>{
        return Compra.destroy({where: id})
    }
}