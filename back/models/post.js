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
            read: { type: DataTypes.BOOLEAN, defaultValue: false }, // Add read field
            usersLiked: { type: DataTypes.STRING, defaultValue: '' },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    Post.getAllPosts = async function () {
        const posts = await Post.findAll({
            order: [
                // Prioritize posts that haven't been read yet
                ['read', 'ASC'],
                // Then sort by creation date in descending order
                ['createdAt', 'DESC'],
            ],
        });
        return posts;
    };
    return Post;
};
