const {UserModel} = require('./DB');

module.exports = {
    novo: async(nome,senha,isAdmin) =>{
        return await UserModel.create({ nome: nome, senha: senha, isAdmin: isAdmin });
    },
    lista: async ()=>{
        return await UserModel.findAll();
    },
    buscaPorId: async ()=>{
        return await UserModel.findByPk(id);
    },
    alterar: async(user)=>{
        return await UserModel.update(user,{where: user.id});
    },
    apagar: (user)=>{
        return UserModel.destroy({where: user.id})
    },
    buscaPorNome:async (nome,senha)=>{
        return await UserModel.findOne({where:{
            nome: nome,
            senha: senha
        }})
    }
}