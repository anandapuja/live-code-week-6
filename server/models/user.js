'use strict';
const bcrypt = require('../helpers/bcrypt').hashPassword;
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { 
    sequelize,
    hooks: {
      beforeCreate(model, options){
        model.password = bcrypt(model.password)
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};