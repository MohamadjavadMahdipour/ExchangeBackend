const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const OthersArchive = db.define(
  "OthersArchive",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    buyPrice: {
      type: DataTypes.STRING,
      require: true,
    },
    sellPrice: {
      type: DataTypes.STRING,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = OthersArchive;
