const web = require('express').Router()

web.get('/', async (req, res, next) => {
    res.render('dashboard', { title: "Dashboard" })
})

module.exports = web
