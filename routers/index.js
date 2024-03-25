const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    // const [rows] = await db.query('SELECT * FROM users')
    // console.log('rows', rows)
    res.render('dashboard', { title: "Dashboard" })
})

module.exports = router
