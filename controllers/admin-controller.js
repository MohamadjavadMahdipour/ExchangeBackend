const Coin = require("../models/COIN/coin");
const CurrencyRemmitance = require("../models/CURRENCY/currencyRemmitance");
const CurrencyArchive = require("../models/ARCHIVE/currencyArch");
const Notification = require("../models/Notifications/notification");
const CoinArchive = require("../models/ARCHIVE/coinArch");
const Currency = require("../models/CURRENCY/currency");
const CoinPrice = require("../models/COIN/coinPrice");
const CurrencyPrice = require("../models/CURRENCY/currencyPrice");

const io = require("../util/socket");

exports.updateCurrency = async (req, res) => {
  let findedCurr;
  let _updatedCurrencies = [];
  let _pBuyPrice;
  let _pSellPrice;
  const body = req.body;
  if (body.length != 19) {
    return res.send({ msg: "invalid request" });
  }
  if (
    body &&
    Object.keys(body).length !== 0 &&
    body[18].secretKey ==
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
  ) {
    try {
      for (const currentElement of body) {
        if (currentElement.id) {
          findedCurr = await CurrencyPrice.findOne({
            where: {
              id: currentElement.id,
            },
          });

          // console.log("findedCurr11", findedCurr);
          if (
            +currentElement.buyPrice === findedCurr.buyPrice &&
            +currentElement.sellPrice === findedCurr.sellPrice
          ) {
            console.log("===");
            _updatedCurrencies.push({ id: findedCurr.id, updated: false });
          } else {
            _pBuyPrice = findedCurr.buyPrice;
            _pSellPrice = findedCurr.sellPrice;
            findedCurr.buyPrice = currentElement.buyPrice;
            findedCurr.sellPrice = currentElement.sellPrice;
            findedCurr.pBuyPrice = _pBuyPrice;
            findedCurr.pSellPrice = _pSellPrice;
            await findedCurr.save();
            // console.log("findedCurr22222", findedCurr);
            _updatedCurrencies.push({ id: findedCurr.id, updated: true });

            try {
              await CurrencyArchive.create({
                buyPrice: findedCurr.buyPrice,
                sellPrice: findedCurr.sellPrice,
                CurrencyId: findedCurr.id,
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      const allCurrencies = await CurrencyPrice.findAll({
        include: { model: Currency },
        through: {
          attributes: ["name", "symbol"],
        },
      });
      io.getio.emit("tabloCurrencies", _updatedCurrencies);
      io.getio.emit("getCurrencies", allCurrencies);

      res.send({ msg: "successfuly" });
    } catch {
      res.status(500).send({ msg: "server problem" });
    }
  } else {
    res.send({ msg: "invalid request " });
  }
};

exports.updateCoin = async (req, res) => {
  let findedCoin;
  let _updatedCoin = [];
  let _pBuyPrice;
  let _pSellPrice;
  const body = req.body;

  if (body.length != 8) {
    return res.status(500).send({ msg: "invalid request" });
  }
  if (
    body &&
    Object.keys(body).length !== 0 &&
    body[7].secretKey ==
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
  ) {
    try {
      for (const currentElement of body) {
        if (currentElement.id) {
          findedCoin = await CoinPrice.findOne({
            where: {
              id: currentElement.id,
            },
          });

          if (
            currentElement.buyPrice == findedCoin.buyPrice &&
            currentElement.sellPrice == findedCoin.sellPrice
          ) {
            _updatedCoin.push({ id: findedCoin.id, updated: false });
          } else {
            _pBuyPrice = findedCoin.buyPrice;
            _pSellPrice = findedCoin.sellPrice;
            findedCoin.buyPrice = currentElement.buyPrice;
            findedCoin.sellPrice = currentElement.sellPrice;
            findedCoin.pBuyPrice = _pBuyPrice;
            findedCoin.pSellPrice = _pSellPrice;
            await findedCoin.save();
            _updatedCoin.push({ id: findedCoin.id, updated: true });
            try {
              await CoinArchive.create({
                buyPrice: findedCoin.buyPrice,
                sellPrice: findedCoin.sellPrice,
                CoinId: findedCoin.id,
              });
            } catch (err) {
              console.log(err);
            }
          }
        }
      }

      const allCoins = await CoinPrice.findAll({
        include: { model: Coin },
        through: {
          attributes: ["name", "symbol"],
        },
      });

      io.getio.emit("tabloCoins", _updatedCoin);
      io.getio.emit("getCoins", allCoins);

      res.send({ msg: "successfuly" });
    } catch {
      res.status(500).send({ msg: "server problem" });
    }
  } else {
    res.status(500).send({ mes: "invalid request " });
  }
};

exports.setNotification = async (req, res) => {
  if (
    req.body.secretKey ==
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
  ) {
    try {
      const { notification } = req.body;
      await Notification.create({
        notification: notification,
      });

      const allnotification = await Notification.findAll({
        limit: 3,
        order: [["createdAt", "DESC"]],
      });
      io.getio.emit("notification", allnotification);

      res.send({ msg: "successfuly" });
    } catch (err) {
      console.log(err);
      res.send({ msg: "invalid request" }).status(422);
    }
  } else {
    res.send({ mes: "invalid request " });
  }
};

exports.updateCurrencyRemmitance = async (req, res) => {
  let premmitance;
  const body = req.body;
  if (body.length != 5) {
    return res.status(500).send({ msg: "invalid request" });
  }
  if (
    body &&
    Object.keys(body).length !== 0 &&
    body[4].secretKey ==
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw"
  ) {
    try {
      for (const element of body) {
        if (element.id) {
          const remmitanceItem = await CurrencyRemmitance.findOne({
            where: {
              id: element.id,
            },
          });

          premmitance = remmitanceItem.remmitance;
          remmitanceItem.remmitance = element.remmitance;
          remmitanceItem.Premmitance = premmitance;
          await remmitanceItem.save();
        }
      }
      const currencyRemmitance = await CurrencyRemmitance.findAll({
        include: { model: Currency },
      });
      io.getio.emit("CurrencyRemmitance", currencyRemmitance);

      res.status(200).send({ msg: "successfuly" });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(500).send({ mes: "invalid request " });
  }
};
