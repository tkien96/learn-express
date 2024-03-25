const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./routers/api/v1')
const web = require('./routers/index')
const errorMiddleware = require('./middlewares/errorHandling')
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
app.use('/api/v1', api)
app.use('', web)
app.get('*', errorMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`)
})