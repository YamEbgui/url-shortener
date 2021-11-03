const express = require("express");
const shortUrlRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../database/db");

shortUrlRouter.post("/", async (req, res) => {
  return res.send(await db.addObjToDb(req.body.originUrl));
});

module.exports = shortUrlRouter;
