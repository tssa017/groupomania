'use strict';
const { Model } = require('sequelize');
// TODO: Bcrypt?

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Publication, {
                foreignKey: 'fk_publication_userId',
            });
        }
    }
    User.init(
        {
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: DataTypes.STRING,
            profilePic: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
