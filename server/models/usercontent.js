'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserContent.belongsTo(models.User, { foreignKey: 'UserId' })
      UserContent.belongsTo(models.Content, { foreignKey: 'ContentId' })
    }
  };
  UserContent.init({
    UserId: DataTypes.INTEGER,
    ContentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserContent',
  });
  return UserContent;
};