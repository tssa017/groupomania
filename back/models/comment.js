'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: 'fk_comment_userId',
            });
            Comment.belongsTo(models.Post, {
                foreignKey: 'fk_comment_postId',
                onDelete: 'CASCADE', // Responses deleted with post
            });
        }
    }
    Comment.init(
        {
            comment: DataTypes.STRING,
            postId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            userProfilePicUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );
    return Comment;
};
