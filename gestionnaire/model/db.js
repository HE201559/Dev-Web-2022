const mysql = require("mysql");
const db = require("../config/db");

const pool = mysql.createPool({
    host: '51.141.115.222',
    user: 'remote',
    //password: '********',
    password: 'Welcom@2803',
    database: 'dev3'
});

module.exports = pool;
