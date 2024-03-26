const auth = require('express').Router()
const authControler = require('../controllers/authController')

auth
.post('/register', authControler.register)
.post('/login', authControler.login)

module.exports = auth