const CurrencyArchive = require("../models/ARCHIVE/currencyArch");
const CoinArchive = require("../models/ARCHIVE/coinArch");
const Currency = require("../models/CURRENCY/currency");
const CoinPrice = require("../models/COIN/coinPrice");
const Coin = require("../models/COIN/coin");
const CurrencyPrice = require("../models/CURRENCY/currencyPrice");
const CurrencyRemmitance = require("../models/CURRENCY/currencyRemmitance");
const Notification = require("../models/Notifications/notification");

exports.getallcoins = async (req, res) => {
  const AllCoins = await CoinPrice.findAll({
    include: { model: Coin },
    through: {
      attributes: ["name"],
    },
  });
  res.status(201).send(AllCoins);
};

exports.getallcurrencies = async (req, res) => {
  const AllCurrensies = await CurrencyPrice.findAll({
    include: { model: Currency },
    through: {
      attributes: ["name", "symbol"],
    },
  });

  res.status(200).send({ AllCurrensies });
};

exports.getArchiveForCurrency = async (req, res) => {
  const { id } = req.body;
  let fetchedArchive;
  try {
    fetchedArchive = await CurrencyArchive.findAll({
      where: {
        CurrencyId: id,
      },
      limit: 4,
      order: [["createdAt", "DESC"]],
    });
    // console.log(fetchedArchive);
    res.status(200).json({ data: fetchedArchive });
  } catch (error) {
    console.log(error);
  }
};
exports.getArchiveForCoin = async (req, res) => {
  const { id } = req.body;
  let fetchedArchive;
  try {
    fetchedArchive = await CoinArchive.findAll({
      where: {
        CoinId: id,
      },

      limit: 4,
      order: [["createdAt", "DESC"]],
    });
    // console.log(fetchedArchive);
    res.status(200).json({ data: fetchedArchive });
  } catch (error) {
    console.log(error);
  }
};
exports.getCurrencyRemmitance = async (req, res) => {
  try {
    const currencyRemmitance = await CurrencyRemmitance.findAll({
      include: { model: Currency },
    });

    res.status(200).json({ data: currencyRemmitance });
  } catch {
    res.status(500).json({ msg: "مشکلی از سمت سرور پیش آمده است" });
  }
};
exports.getNotificaton = async (req, res) => {
  try {
    const notification = await Notification.findAll({
      limit: 3,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).send(notification);
  } catch {
    res.status(500).json({ msg: "server side Error" });
  }
};
