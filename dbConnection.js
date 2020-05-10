const mysql = require('mysql');
const config = {
    host: 'localhost', // only private ip here
    user: 'pavan',
    password:'dongare',
    database: 'devconnect',
};

const mySqlpool = mysql.createPool(config);

module.exports = mySqlpool;