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
            read: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    // FindAll query to prioritise unread posts and organise order (newest to oldest)
    Post.getAllPosts = async function () {
        const posts = await Post.findAll({
            order: [
                // Prioritise posts that haven't been read yet
                ['read', 'ASC'],
                // Sort by creation date so they display in descending order
                ['createdAt', 'DESC'],
            ],
        });
        return posts;
    };
    return Post;
};
