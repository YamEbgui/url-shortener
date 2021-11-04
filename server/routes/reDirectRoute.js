const express = require("express");
const cors = require("cors");
const reDirectRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../database/db");

reDirectRouter.get("/:shortUrl", async (req, res, next) => {
  try {
    const originUrl = await db.getOriginUrl(req.params.shortUrl);
    if (!originUrl) {
      console.log(originUrl);
      throw { status: 404, message: { error: "NOT FOUND" } };
    }
    if (originUrl.slice(0, 5) !== "http") {
      return res.redirect(`http://${originUrl}`);
    }
    res.redirect(originUrl);
  } catch (err) {
    next(err);
  }
});

module.exports = reDirectRouter;
