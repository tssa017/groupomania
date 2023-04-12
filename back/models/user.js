'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Post, {
                foreignKey: 'userId',
            });
            User.hasMany(models.Comment, {
                foreignKey: 'userId',
            });
        }
    }
    User.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
            },
            profilePic: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
