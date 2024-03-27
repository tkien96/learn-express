const express = require('express')
const app = new express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors')
const { auth, api, web } = require('./routers')
const { verifyAuth, verifySignin, verifyToken, morganMiddleware } = require('./middlewares')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: parseInt(process.env.EXPIRES_IN)
    }
}))

// view engine setup
app.use(expressLayouts)
app.set('layout', './layouts/default')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(morganMiddleware)
// router

app.use('/api', verifyToken, api)
app.use('/auth', verifyAuth, auth)
app.use('', verifySignin, web)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running: http://localhost:${ port }`)
})
