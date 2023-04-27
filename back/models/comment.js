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
            comment: { type: DataTypes.STRING(4000) },
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );
    // FindAll query to organise comment order
    Comment.getAllComments = async function () {
        const comments = await Comment.findAll({
            order: [
                // Sort by creation date so they display oldest to newest
                ['createdAt', 'ASC'],
            ],
        });
        return comments;
    };
    return Comment;
};
