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
            { email, password } = req.body
        if(error) return res.status(400).json({ message: error.details[0].message })
        const user = await SQUsers.findOne({ where: { email: email, active: "1" }, attributes: ["id", "name", "phone", "email", "password"] })
        if(!user) return res.status(400).json({ message: 'Email or Password is not correct !' })
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword) return res.status(400).json({ message: 'Email or Password is not correct !' })
        const token = jwt.sign({ id: user.id, name: user.name, phone: user.phone, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: process.env.EXPIRES_IN })
        res.header('authorization', token).send(token)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    register,
    login
}
