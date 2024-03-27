require('dotenv').config()
const Sequelize = require('sequelize')
const userModel = require('./userModel')

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: { 
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const SQUsers = userModel.InitSequel(sequelize, Sequelize)

module.exports = {
    SQUsers
}