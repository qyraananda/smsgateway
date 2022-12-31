var mysql = require('mysql2');
const mysql2Timeout = require('mysql2-timeout-additions');

var con = mysql.createPool({
    connectionLimit: 100,
    host: "35.186.154.57",
    user: "egogo",
    password: "3g0g0it",
    database: "gammu"
});

// var con = mysql.createPool({
//     connectionLimit: 100,
//     host: "localhost",
//     user: "usergammu",
//     password: "password321",
//     database: "gammu"
// });

const promisePool = con.promise();

mysql2Timeout.addTimeoutToPromisePool({
    pool: promisePool,
    seconds: 600000
});

con.getConnection(function(err, connection) {
    // connection.release();
    console.log('Connect :)')
});

con.on('connection', function(connection) {
    console.log('DB Connection established');

    connection.on('error', function(err) {
        console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function(err) {
        console.error(new Date(), 'MySQL close', err);
    });

});

module.exports = con;