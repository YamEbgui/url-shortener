//import section
const fs = require("fs");
const fsAsync = require("fs/promises");
const path = require("path");
const util = require("util");
const moment = require("moment");
const readFile = (filename) => util.promisify(fs.readFile)(filename, "utf-8");

//DataBase class that has methods for DataBase use
class DataBase {
  static #createShortCut() {
    //function that generates a unique random sequnce
    let shortUrl = "";
    for (let i = 0; i < 7; i++) {
      if (Math.random() < 0.5) {
        shortUrl += String.fromCharCode(65 + Math.floor(Math.random() * 26));
      } else {
        shortUrl += String.fromCharCode(48 + Math.floor(Math.random() * 10));
      }
    }
    return shortUrl;
  }
  static async #readDataBase() {
    //function that reads the database
    try {
      const fileData = await readFile("./server/db.json");
      return fileData;
    } catch (error) {
      throw error;
    }
  }
  static async #createUrlObj(_originUrl) {
    //function that creates an url object
    try {
      let newShortCut = await this.#createShortCut();
      while (await this.#checkIfUrlExist(newShortCut)) {
        newShortCut = await this.#createShortCut();
      }
      const urlObj = {
        originUrl: _originUrl,
        shortUrl: newShortCut,
        views: 0,
        creatorDate: moment().format("dddd,MMMM Do YYYY, h:mm:ss a"),
      };
      return urlObj;
    } catch (error) {
      throw error;
    }
  }
  static async addObjToDb(originUrl) {
    // function that adds the new object we generated to the database
    try {
      if (await this.#isShortenExist(originUrl)) {
        return await this.#getShortUrl(originUrl);
      }
      return await this.#writeUrl(await this.#createUrlObj(originUrl));
    } catch (error) {
      throw error;
    }
  }
  static async #writeUrl(newObj) {
    // function that updates the data base with the new objects
    try {
      const dataBase = JSON.parse(await this.#readDataBase());
      const objectsArr = dataBase.objects;
      objectsArr.push(newObj);
      dataBase.objects = objectsArr;
      await fsAsync.writeFile("./server/db.json", JSON.stringify(dataBase));
      return newObj.shortUrl;
    } catch (error) {
      throw error;
    }
  }
  static async #checkIfUrlExist(randomSequence) {
    // function that checks if url already exists in database
    try {
      let dataBase = await this.#readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i++) {
        if (dataBase.objects[i].shortUrl === randomSequence) {
          return true;
        }
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  static async #isShortenExist(_originUrl) {
    // function that checks if the unique sequence we gave him already exists in database
    try {
      let dataBase = await this.#readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i++) {
        if (dataBase.objects[i].originUrl === _originUrl) {
          return true;
        }
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  static async #getShortUrl(_originUrl) {
    // function that returns a short url
    try {
      let dataBase = await this.#readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i++) {
        if (dataBase.objects[i].originUrl === _originUrl) {
          return dataBase.objects[i].shortUrl;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  static async getOriginUrl(_shortUrl) {
    // functions that gets a shorturl and returns originalurl
    try {
      let dataBase = await this.#readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i++) {
        if (dataBase.objects[i].shortUrl === _shortUrl) {
          dataBase.objects[i].views++;
          await fsAsync.writeFile("./server/db.json", JSON.stringify(dataBase));
          console.log(dataBase.objects[i].originUrl);
          return dataBase.objects[i].originUrl;
        }
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  static async getObjectByShortUrl(_shortUrl) {
    // function that gets a shorturl and returns the url object
    try {
      let dataBase = await this.#readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i++) {
        if (dataBase.objects[i].shortUrl === _shortUrl) {
          return dataBase.objects[i];
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = DataBase;
