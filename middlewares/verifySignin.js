const jwt = require('jsonwebtoken')

const verifySignin = (req, res, next) => {
    try {
        const auth = req.session.auth
        console.log(auth)
        if (!auth.token) return res.redirect('/auth/signin')
        jwt.verify(auth.token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) res.redirect('/auth/signin')
            if (!auth.isLogin) res.redirect('lock-screen')
            next()
        })
    } catch (err) {
        return res.redirect('/auth/signin')
    }
}
module.exports = verifySignin
