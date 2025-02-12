const {IngressoModel} = require('./DB');

module.exports = {
    novo: async() =>{
        return await IngressoModel.create({nome: nome,preco: preco, quantidade: quantidade});
    },
    lista: async ()=>{
        return await IngressoModel.findAll();
    },
    busca: async ()=>{
        return await IngressoModel.findByPk(id);
    },
    alterar: async(ingresso)=>{
        return await IngressoModel.update(ingresso,{where: ingresso.id });
    },
    apagar: (id)=>{
        return IngressoModel.destroy({where: id})
    }
}