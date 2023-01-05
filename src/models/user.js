'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    name: DataTypes.STRING,
    studyLevel: DataTypes.STRING,
    faculty: DataTypes.STRING,
    department: DataTypes.STRING,
    establishment: DataTypes.STRING,
    city: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};