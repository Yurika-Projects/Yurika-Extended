/* eslint global-require: "off" */
const http = require('http');
const { logger } = require('./Extended/Logger');
require('dotenv').config();

const Replit = (process.env.REPLIT_DB_URL !== undefined);
function initialize(replit = false) {
   if (replit) {
    logger.info('[REPLIT ENVIRONMENT DETECTED] [STARTING WEBSERVER]');
    http.createServer((req, res) => {
      const now = new Date().toLocaleString('en-US');
      res.end(`OK (200) - ${now}`);
    }).listen(3000);
    return require('./yurika');
  } return require('./yurika');
}

initialize(Replit);
