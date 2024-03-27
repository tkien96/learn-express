const web = require('express').Router()

web
.get('/', async (req, res) => {
    res.render('pages/dashboard', { title: "Dashboard" })
})


module.exports = web
