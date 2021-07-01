// configure
require('dotenv').config() // load .env file into ENV
// common configuration
const config = {
    port: process.env.PORT || 3000,
    theme: process.env.THEME || "datajoint",
    host: process.env.HOSTNAME || 'https://datajoint.org'
};

module.exports = config;