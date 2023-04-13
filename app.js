require('express-async-errors')
require('dotenv').config()
const express = require("express")
const app = express()
const authRouter = require('./routes/auth')
const resumeRouter = require('./routes/resume')
const connectDB = require("./db/connect")
const authMW = require('./middleware/authenticate')
const notFound = require('./middleware/not-found')

app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/resume', authMW, resumeRouter)
app.use(notFound)
const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Listening to port ${port}`))

  } catch (error) {
    console.log(error)
  }
}

start()