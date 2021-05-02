const {Model, Datatypes, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Employees extends Model{}

Employees.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        managerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'employee'
    }
);

module.exports = Employees;