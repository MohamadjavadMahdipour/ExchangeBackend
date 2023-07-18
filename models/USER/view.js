const { DataTypes, DATE } = require("sequelize");
const db = require("../../util/db.js");

const View = db.define("View", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    require: true,
  },
  Dcount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  onlineUsers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  Wcount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  Mcount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = View;

View.sync()
  .then(() => {
    return View.findAll();
  })
  .then((finded) => {
    if (finded.length == 0) {
      initialView();
    }
  })
  .catch((err) => {
    console.log(err);
  });
