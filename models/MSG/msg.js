const { DataTypes, DATE } = require("sequelize");
const db = require("../../util/db.js");

const Msg = db.define("messages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    require: true,
  },
  msg: {
    type: DataTypes.STRING,
    default: 0,
  },
});
module.exports = Msg;
