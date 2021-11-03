require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shortUrlRouter = require("./routes/shortUrlRoute");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/public", express.static(`./public`));
app.use("/api/shorturl/", shortUrlRouter);
app.use("/api/statistic/", shortUrlRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/", (req, res) => {
  res.send("test");
});

module.exports = app;
