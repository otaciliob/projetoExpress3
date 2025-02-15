const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './database.sqlite'
});

const UserModel = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true        
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        type: DataTypes.INTEGER.UNSIGNED,
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
const Compra = sequelize.define('Compra', {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel, // 'Users' would also work
      key: 'id',
    },
  },
  IngressoId: {
    type: DataTypes.INTEGER,
    references: {
      model: IngressoModel, // 'Ingressos' would also work
      key: 'id',
    },
  },
});
UserModel.belongsToMany(IngressoModel, { through: Compra });
IngressoModel.belongsToMany(UserModel, { through: Compra });


module.exports = {
    sequelize: sequelize,
    UserModel: UserModel,
    IngressoModel: IngressoModel,
    Compra: Compra
}