'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE', // Responses deleted with post
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'postId',
                onDelete: 'CASCADE', // Responses deleted with post
            });
        }
    }
    Comment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comment: DataTypes.STRING,
            likes: DataTypes.INTEGER,
            usersLiked: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );
    return Comment;
};
