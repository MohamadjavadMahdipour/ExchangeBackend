const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const Coin = db.define(
  "Coin",
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
module.exports = Coin;

Coin.sync()
  .then(() => {
    return Coin.findAll();
  })
  .then((finded) => {
    if (finded.length == 0) {
      initialCoin();
    }
  })
  .catch((err) => {
    console.log(err);
  });

const initialCoin = async () => {
  try {
    await Coin.create({ name: "سکه تمام قدیم" });
    await Coin.create({ name: "سکه تصویر امامی" });
    await Coin.create({ name: "سکه نیم بهار" });
    await Coin.create({ name: "سکه ربع بهار" });
    await Coin.create({ name: "سکه یک گرمی" });
    await Coin.create({ name: "سکه پارسیان" });
  } catch (err) {
    console.log(err);
  }
};
