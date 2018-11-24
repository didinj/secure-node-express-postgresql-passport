'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    prod_name: DataTypes.STRING,
    prod_desc: DataTypes.STRING,
    prod_price: DataTypes.FLOAT
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};