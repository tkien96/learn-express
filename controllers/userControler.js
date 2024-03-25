const { SQUsers } = require("../models/sequelize")

const read = async (req, res) => {
  try {
    const users = await SQUsers.findAll({ attributes: ["id", "name", "phone", "email", "created_at", "updated_at", "active"] })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const create = async (req, res) => {
  try {
    SQUsers.create(req.body)
    res.status(200).json({ message: "Success !" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  read,
  create,
}
