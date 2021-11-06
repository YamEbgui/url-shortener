# ![URL SHORTNER HEADLINE](.readme-files/URL_Shortner_Headline.png) Final 1 - URL shortner 📎

## Introduction

In this project I built my own [URL shortner](https://en.wikipedia.org/wiki/URL_shortening)!
To create this website I used:

- Html
- JavaScript
- Scss
- Webpack 5
- Heroku

To build my server I used Express.js framework.

## Structure of the DataBase

The URL adresses the user inserted to the website are storage in DataBase.
the structure of this DataBase is:

{"objects" : [
{ originUrl: ,
shortUrl:,
views:,
creatorDate: }
]}

## Guidelines

- Create a route `/api/shorturl/` in your `express` app that will handle all url shortening requests. (We recommend using [express Router](https://expressjs.com/en/guide/routing.html))

- Write/read **Asynchronously** a single JSON file as your DB

- [Serve](https://expressjs.com/en/starter/static-files.html) your client files from your server at route `/`

- Style and change your front-end as you wish. You can take inspiration from this [example](https://www.shorturl.at/)

## Requirements

- Examine thoroughly and copy all functionality of [this](https://url-shortener-microservice.freecodecamp.rocks/) FCC example

- Use a `class DataBase{}` to read/write (**Asynchronously**) all data in your back-end (you can use a json file as persistent layer)

- Add another functionality to your service: a statistics route (`api/statistic/:shorturl-id`) that will respond with the following data per `shorturl-id`:

  - `creationDate` - a SQLDate format
  - `redirectCount` - the amount of times this url was used for redirection
  - `originalUrl`
  - `shorturl-id`

- Fully test your `express` app with `jest` and `supertest`. Test each end point response **including** error responses.

  Use a separate DB file for your tests. _Hint: use [Environment variables](https://jestjs.io/docs/en/environment-variables)_

## Bonus

- Add any feature you desire. Some ideas worth extra points:
  - Custom short URL. Support optional `shorturl-id` parameter in your `POST` request. Pay attention to error handling.
  - Serve a styled statistics dashboard instead of the default JSON statistics
  - Use the [`JSONBIN.io`](https://jsonbin.io/) service bin as your persistent layer in your back-end DB class (use CRUD operations to read write bins)
  - Try implementing user management
- Use supertest/puppeteer test to test any bonus feature you implemented

**Add an explanation in `README.md` for each bonus feature you add and a link to any resource you used**

## Grading policy

- Using jsonbin.io with/instead of writing to files
- Correct DB class usage
- Code quality and style: indentation, Meaningful and non-disambiguate variable names, Comments and documentation, file and directory structure
- Visual creativity, style your front-end to make it look awesome 💅🏿
- Division to reusable functions, no code duplication
- Git usage: meaningful commit messages, small commits, folder and file structures, README file, issues, etc...

### Misc

- [ ] **Add workflow scripts**
  - [x] build - webpack build ./web into ./public folder
  - [ ] dev - start a nodemon server && start webpack dev server
  - [ ] deploy to heroku

### Front

- [ ] **make better design**
- [x] **home page** - /app
  - [x] url shorten input -> POST /api/shrten/ { url: <input url> }
  - [x] bootstrap sexy design
  - [x] nice error display
- [ ] **stats page** /app/<UID>
  - [ ] requests the stats from -> GET /api/stats/<UID>
  - [ ] error display
  - [ ] add dashboard with stats display:
    - [ ] locations of requests
    - [ ] unique requesters
    - [ ] usage graph

### Back

- [x] POST /api/shorten/ { url: <input url> }
  - [x] validate url
  - [x] check if already was shortened
  - [x] return the shorterned url
  - [x] check if uid is realy unique
- [x] GET /<UID>
  - [x] store user req data
  - [x] redirect to the URL
- [x] GET /app
  - [x] serve the static from ./public folder
- [x] GET /api/stats/<UID>
  - [x] respond with JSON of the stats
- [x] **refactoring**
