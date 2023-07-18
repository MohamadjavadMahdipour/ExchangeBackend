const { DataTypes } = require("sequelize");
const db = require("../../util/db.js");

const Currency = db.define(
  "Currency",
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
    symbol: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);
module.exports = Currency;

Currency.sync()
  .then(() => {
    return Currency.findAll();
  })
  .then((finded) => {
    if (finded.length == 0) {
      initalCurrency();
    }
  })
  .catch((err) => {
    console.log(err);
  });

const initalCurrency = async () => {
  try {
    await Currency.create({
      name: "دلارآمریکا",
      symbol: "USD",
    });
    await Currency.create({
      name: "یورو",
      symbol: "EUR",
    });
    await Currency.create({
      name: "دلار کانادا",
      symbol: "CAD",
    });
    await Currency.create({
      name: "دلار استرالیا",
      symbol: "AUD",
    });
    await Currency.create({
      name: "پوند انگلیس",
      symbol: "GBP",
    });
    await Currency.create({
      name: "درهم امارات",
      symbol: "AED",
    });
    await Currency.create({
      name: "کرون سوئد",
      symbol: "SEK",
    });
    await Currency.create({
      name: "کرون نروژ",
      symbol: "NOK",
    });
    await Currency.create({
      name: "	کرون دانمارک",
      symbol: "DKK",
    });
    await Currency.create({
      name: "ریال عربستان",
      symbol: "SAR",
    });
    await Currency.create({
      name: "لیر ترکیه",
      symbol: "TRY",
    });
    await Currency.create({
      name: "فرانک سوییس",
      symbol: "CHF",
    });
    await Currency.create({
      name: "ین ژاپن",
      symbol: "JPY",
    });
    await Currency.create({
      name: "	رینگیت مالزی",
      symbol: "MYR",
    });
    await Currency.create({
      name: "	یوان چین",
      symbol: "CNY",
    });
    await Currency.create({
      name: "دینار عراق",
      symbol: "IQD",
    });
    await Currency.create({
      name: "منات آذربایجان",
      symbol: "AZN",
    });
    await Currency.create({
      name: "روپیه هند",
      symbol: "RUP",
    });
  } catch (err) {
    console.log(err);
  }
};
