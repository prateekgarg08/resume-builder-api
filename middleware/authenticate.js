const jwt = require('jsonwebtoken')
const authenticate = async (req, res, next) => {
  const authHeaders = req.headers.authorization
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    throw new Error('Authentication Failed')
  }
  const token = authHeaders.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = {
      name: payload.name,
      userId: payload.userId
    }
    req.user = user
    next()
  } catch (error) {
    throw new Error('Invalid token')
  }
}

module.exports = authenticate