'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Publication extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
