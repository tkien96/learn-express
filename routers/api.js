const api = require('express').Router()
const userControler = require('../controllers/userControler')

api
.get('/users', userControler.list)
.post('/users/:id', userControler.update)

module.exports = api
