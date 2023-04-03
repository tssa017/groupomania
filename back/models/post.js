'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'fk_post_userId',
                onDelete: 'CASCADE', // Responses deleted with post
            });
        }
    }
    Post.init(
        {
            post: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            postPicUrl: DataTypes.STRING,
            likes: DataTypes.INTEGER,
            usersLiked: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};
