const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    maxlength: 50,
    match: [/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "Please enter a valid email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 6,
    maxlength: 12
  },

})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {

  const token = jwt.sign({
    name: this.name,
    userId: this._id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  })

  return token
}

UserSchema.methods.comparePasswords = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)