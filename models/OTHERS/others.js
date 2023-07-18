const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const Others = db.define(
  "Other",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    name: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = Others;
