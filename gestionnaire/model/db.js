const mysql = require("mysql");
const db = require("../config/db");

const pool = mysql.createPool({
    host: '137.74.198.28',
    user: 'remote',
    //password: '********',
    password: 'Welcom@2803',
    database: 'gestionnaire_collection'
});

module.exports = pool;
