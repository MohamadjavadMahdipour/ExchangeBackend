const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const othersPrice = db.define(
  "othersPrice",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    buyPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sellPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);
module.exports = othersPrice;
