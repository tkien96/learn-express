const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
    database: ENV.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

module.exports = db
