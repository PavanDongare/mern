const mysql = require('mysql');
const config = {
    host: 'localhost', // only private ip here
    user: 'pavan',
    password:'pavandongare',
    database: 'devconnect',
};

const mySqlpool = mysql.createPool(config);

module.exports = mySqlpool;