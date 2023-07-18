const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const coinPrice = db.define(
  "coinPrice",
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
module.exports = coinPrice;

coinPrice
  .sync()
  .then(() => {
    return coinPrice.findAll();
  })
  .then((finded) => {
    if (finded.length == 0) {
      initialCoinPrice();
    }
  })
  .catch((err) => {
    console.log(err);
  });

const initialCoinPrice = async () => {
  try {
    await coinPrice.create({ CoinId: 1 });
    await coinPrice.create({ CoinId: 2 });
    await coinPrice.create({ CoinId: 3 });
    await coinPrice.create({ CoinId: 4 });
    await coinPrice.create({ CoinId: 5 });
    await coinPrice.create({ CoinId: 6 });
  } catch (err) {
    //  console.log(err);
  }
};
