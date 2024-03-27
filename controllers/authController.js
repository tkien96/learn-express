const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { SQUsers } = require("../models/sequelize")
const { registerValidator, loginValidator } = require("../validations/authValidator")

const register = async (req, res) => {
  try {
    const { error } = registerValidator(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })
    const data = req.body, 
      checkUserExists = await SQUsers.findOne({ where: { email: data.email, active: "1" } })
    if (checkUserExists) return res.status(400).json({ message: `${data.email} Registered !` })
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt)
    SQUsers.create(data)
    res.status(200).json({ message: "Success !", data: data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
    try {
        const { error } = await loginValidator(req.body),
          { email, password, remember } = req.body,
          attributes = ["id", "name", "phone", "email", "password"]
        if(error) return res.status(400).json({ message: error.details[0].message })
        const user = await SQUsers.findOne({ where: { email: email, active: "1" }, attributes: attributes })
        if(!user) return res.status(400).json({ message: 'Email or Password is not correct !' })
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) return res.status(400).json({ message: 'Email or Password is not correct !' })
        const token = jwt.sign({ ...user.dataValues }, process.env.TOKEN_SECRET, { expiresIn: process.env.EXPIRES_IN }),
          result = {user: { ...user.dataValues }, isLogin: true, remember: remember, token: token}
        req.session.auth = result
        res.header('authorization', token).status(200).json({ message: "Signin success !", data: result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
        console.error('Error destroying session:', err)
        res.status(500).send('Error logging out')
    } else {
        res.send('Logged out successfully')
    }
  })
}

module.exports = {
    register,
    login,
    logout
}
