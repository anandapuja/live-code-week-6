'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Food extends Model {}

  Food.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    tag: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, { sequelize })

  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsTo(models.User)
  };
  return Food;
};