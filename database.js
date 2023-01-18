const mysql = require('mysql2')
require('dotenv').config();

module.exports = mysql.createConnection({
    host: '172.20.0.128',
    user: 'atomadmin',
    password: 'Kub3at002+',
    database: 'Kube'
})