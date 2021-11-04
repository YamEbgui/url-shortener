const express = require("express");
const shortUrlRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../database/db");
const { isURL } = require("validator");

shortUrlRouter.post("/", async (req, res, next) => {
  if (isURL(req.body.originUrl)) {
    return res.send(await db.addObjToDb(req.body.originUrl));
  } else {
    next({ status: 400, message: { error: "Invalid URL" } });
  }
});

module.exports = shortUrlRouter;