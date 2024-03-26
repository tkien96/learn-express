const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const { auth, api, web } = require('./routers')
const { verifyToken } = require('./middlewares')
require('dotenv').config()
const app = new express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')))

// router
app.use('/api', verifyToken, api)
app.use('/auth', auth)
app.use('', web)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`)
})