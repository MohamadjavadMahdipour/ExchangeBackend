const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("datis-db", "root", "Mahdipour@javad@1379", {
  dialect: "mysql",
  host: "localhost",
  port: "3306",
});

module.exports = sequelize;
