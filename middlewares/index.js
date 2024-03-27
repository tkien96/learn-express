const verifyToken = require('./verifyToken')
const verifySignin = require('./verifySignin')
const verifyAuth = require('./verifyAuth')
const morganMiddleware = require('./morgan')

module.exports = {
    verifyAuth,
    verifyToken,
    verifySignin,
    morganMiddleware
}