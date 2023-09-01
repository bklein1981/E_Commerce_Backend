const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // id
    id: {
      DataTypes: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // product_id
    product_id: {
      DataTypes: INTEGER,
      references: {
        model: 'product',
        key: 'id',
        unique: false
      }
    },
    //tag id 
    tag_id: {
      DataTypes: INTEGER,
      references: {
        model: 'tag',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
