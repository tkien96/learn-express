const api = require('express').Router()
const userControler = require('../controllers/userControler')

api
.get('/users', userControler.list)
.put('/users/:id', userControler.update)
.delete('/users/:id', userControler.deleted)

module.exports = api
