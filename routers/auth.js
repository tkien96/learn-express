const auth = require("express").Router()
const authControler = require("../controllers/authController")

auth
// POST
.post("/register", authControler.register)
.post("/login", authControler.login)
.get("/signin", (req, res) => {
    console.log(req.session)
    res.render("pages/auth/signin", { 
        title: "Signin",
        layout: "layouts/blank" 
    })
})
.get("/signup", (req, res) => {
    res.render("pages/auth/signup", {
        title: "Signup",
        layout: "layouts/blank",
    })
})
.get("/forgot-password", (req, res) => {
    res.render("pages/auth/forgot", {
        title: "Forgot password",
        layout: "layouts/blank",
    })
})
.get("/lock-screen", (req, res) => {
    res.render("pages/auth/lock", {
        title: "Lock screen",
        layout: "layouts/blank"
    })
})

module.exports = auth
