const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw Error('Invalid Credentails')
  }
  const isCorrect = await user.comparePasswords(password)
  if (!isCorrect) {
    throw Error('Invalid Credentails')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ token, user: { name: user.name, email: user.email } })
}

const register = async (req, res) => {


  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ token: user.createJWT() })
}



module.exports = { login, register }