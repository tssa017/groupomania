'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Publication extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'fk_publication_userId',
            });
        }
    }
    Publication.init(
        {
            post: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            userProfilePicUrl: DataTypes.STRING,
            postPicUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Publication',
        }
    );
    return Publication;
};
