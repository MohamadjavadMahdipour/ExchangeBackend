const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const CurrencyRemmitance = db.define(
  "currencyRemmitance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    remmitance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    Premmitance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);
module.exports = CurrencyRemmitance;
