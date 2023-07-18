const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const currencyPrice = db.define(
  "currencyPrice",
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
    pBuyPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pSellPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);
module.exports = currencyPrice;

currencyPrice
  .sync()
  .then(() => {
    return currencyPrice.findAll();
  })
  .then((finded) => {
    if (finded.length == 0) {
      initialCurrencyPrice();
    }
  })
  .catch((err) => {
    console.log(err);
  });

const initialCurrencyPrice = async () => {
  try {
    await currencyPrice.create({
      CurrencyId: 1,
    });
    await currencyPrice.create({
      CurrencyId: 2,
    });
    await currencyPrice.create({
      CurrencyId: 3,
    });
    await currencyPrice.create({
      CurrencyId: 4,
    });
    await currencyPrice.create({
      CurrencyId: 5,
    });
    await currencyPrice.create({
      CurrencyId: 6,
    });
    await currencyPrice.create({
      CurrencyId: 7,
    });
    await currencyPrice.create({
      CurrencyId: 8,
    });
    await currencyPrice.create({
      CurrencyId: 9,
    });
    await currencyPrice.create({
      CurrencyId: 10,
    });
    await currencyPrice.create({
      CurrencyId: 11,
    });
    await currencyPrice.create({
      CurrencyId: 12,
    });
    await currencyPrice.create({
      CurrencyId: 13,
    });
    await currencyPrice.create({
      CurrencyId: 14,
    });
    await currencyPrice.create({
      CurrencyId: 15,
    });
    await currencyPrice.create({
      CurrencyId: 16,
    });
    await currencyPrice.create({
      CurrencyId: 17,
    });
    await currencyPrice.create({
      CurrencyId: 18,
    });
  } catch (err) {
    console.log(err);
  }
};
