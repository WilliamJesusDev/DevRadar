const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const { MONGOOSE, LOCALE, HOME_URL, WORK_URL, PORT } = process.env;

const routes = require("./routes");
const { setupWebSocket } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(MONGOOSE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT || 3333, () => {
  console.log(
    "\x1b[34m%s\x1b[0m",
    `[running] server on http://localhost:${PORT} | http://${
      LOCALE === "HOME" ? HOME_URL : WORK_URL
    }:${PORT}`
  );
});
