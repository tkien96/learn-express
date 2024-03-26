const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) return res.status(400).send('Access Denied')
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(400).json({ message: err.message })
            req.user = decoded
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }   
}

module.exports = verifyToken
