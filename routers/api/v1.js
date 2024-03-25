const express = require('express')
const router = express.Router()
const verifyToken = require('../../middlewares/verifyToken')
const userControler = require('../../controllers/userControler')
const userValidate = require('../../validators/userValidate')

router.get('', (req, res, next) => {
    res.status(200).send({ 
        success: true,
        message: 'APT version 1',
        data: {} 
    })
})

// users
router.get('/users', userControler.read)
router.post('/users', userControler.create)

module.exports = router
