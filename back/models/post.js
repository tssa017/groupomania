'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
                allowNull: false,
            });
            Post.hasMany(models.Comment, {
                foreignKey: 'postId',
                as: 'Comments',
            });
        }
    }
    Post.init(
        {
            post: { type: DataTypes.STRING(4000) },
            postPicUrl: { type: DataTypes.STRING(512) },
            likes: { type: DataTypes.INTEGER, defaultValue: 0 },
            usersLiked: { type: DataTypes.STRING, defaultValue: '' },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};
