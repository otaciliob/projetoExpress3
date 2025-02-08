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


module.exports = {
    sequelize: sequelize,
    UserModel: UserModel
}