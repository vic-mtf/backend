'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User, {
        foreignKey: {
          name: 'id',
          allowNull: false,
        },
      })
    }
  }
  Document.init({
    subject: DataTypes.STRING,
    director: DataTypes.STRING,
    supervisors: DataTypes.STRING,
    academicYear: DataTypes.STRING,
    summary: DataTypes.STRING,
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};