const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send({ message: 'Access Denied' })
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err) {
                console.log(err)
                return res.status(401).send({ message: 'Access Denied' })
            } else {
                req.user_id = decoded.id
                req.isLoggedIn = true
                next()
            }
        })
    } catch (error) {
        return response.status(400).send({message: 'Invalid Token'});
    }
}
