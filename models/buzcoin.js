'use strict';
module.exports = (sequelize, DataTypes) => {
  var buzcoin = sequelize.define('buzcoin', {
    marcetname: DataTypes.STRING,
    tickername: DataTypes.STRING,
    tickerbuy: DataTypes.NUMERIC,
    tickersell: DataTypes.NUMERIC,
    createtime: DataTypes.INTEGER
  }, {});
  buzcoin.associate = function(models) {
    // associations can be defined here
  };
  return buzcoin;
};