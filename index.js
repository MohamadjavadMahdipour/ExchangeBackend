const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const socketIO = require("socket.io");
const { SOCKETPATH } = require("./util/config");
const sequelize = require("./util/db.js");
const Coin = require("./models/COIN/coin");
const CurrencyArchive = require("./models/ARCHIVE/currencyArch");
const OthersArchive = require("./models/ARCHIVE/othersArch");
const CoinArchive = require("./models/ARCHIVE/coinArch");
const Currency = require("./models/CURRENCY/currency");
const CoinPrice = require("./models/COIN/coinPrice");
const CurrencyPrice = require("./models/CURRENCY/currencyPrice");
const othersPrice = require("./models/OTHERS/othersPrice");
const Others = require("./models/OTHERS/others");
const CurrencyRemmitance = require("./models/CURRENCY/currencyRemmitance");
const Notification = require("./models/Notifications/notification");
const clientRoutes = require("./routes/client-routes");
const adminRoutes = require("./routes/admin-routes");
let mySocket;
let socket;

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", clientRoutes);
app.use("/api", adminRoutes);

sequelize
  .sync()
  //  .sync({ force: true })
  .then((result) => {
    const server = app.listen(4000, () => {
      console.log("Server is up on port " + 4000);
      // socket = socketIO(server, {
      //   cors: {
      //     origin: "*",
      //     methods: ["*"],
      //     transports: ["polling"],
      //   },
      //   allowEIO3: true,
      //   // wsEngine: "ws",
      // });
      const socket = require("./util/socket").init(server);

      mySocket = socket.of(SOCKETPATH);
      mySocket.on("connection", async (socket) => {
        console.log("CONNECTED");
        socket.emit("test");
        socket.on("disconnect", async (data) => {});
      });
    });
  })
  .catch((err) => {
    // console.log(err);
  });

CoinPrice.belongsTo(Coin);
CurrencyPrice.belongsTo(Currency);
othersPrice.belongsTo(Others);
CoinArchive.belongsTo(Coin);
CurrencyArchive.belongsTo(Currency);
OthersArchive.belongsTo(Others);
CurrencyRemmitance.belongsTo(Currency);
