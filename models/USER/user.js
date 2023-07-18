const { DataTypes, DATE } = require("sequelize");
const db = require("../../util/db.js");

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    require: true,
  },
  ip: {
    type: DataTypes.STRING,
    require: true,
  },
  token: {
    type: DataTypes.STRING,
    require: true,
  },
});
module.exports = User;
