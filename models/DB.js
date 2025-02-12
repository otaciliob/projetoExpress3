const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './database.sqlite'
});

const UserModel = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
const IngressoModel = sequelize.define('Ingresso',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantidade:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
});
//adicionar tabela de relacionameto M<=>M (Compra)


module.exports = {
    sequelize: sequelize,
    UserModel: UserModel,
    IngressoModel: IngressoModel
}