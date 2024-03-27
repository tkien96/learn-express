const verifyAuth = (req, res, next) => {
    const auth = req.session.auth
    if(auth) {
        if(auth.isLogin) res.redirect('/')
        res.redirect('/auth/lock-screen')
    } else next()
}
module.exports = verifyAuth
