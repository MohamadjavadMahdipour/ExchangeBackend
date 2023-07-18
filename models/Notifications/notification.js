const { DataTypes, DATE } = require("sequelize");
const db = require("../../util/db.js");

const Notification = db.define("notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    require: true,
  },
  notification: {
    type: DataTypes.TEXT,
    default: "",
  },
});
module.exports = Notification;
