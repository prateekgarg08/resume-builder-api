const Resume = require('../models/Resume')
const ejs = require('ejs');
var path = require('path');

const { StatusCodes } = require('http-status-codes')

const postResume = async (req, res) => {
  const userId = req.user.userId
  req.body.createdBy = userId
  const resume = await Resume.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ resume })
}

const getResume = async (req, res) => {
  const ejsFilePath = path.join(__dirname, '..', 'views', 'try.ejs');
  // console.log(file)
  const userId = req.user.userId
  const resume = await Resume.findOne({ createdBy: userId })
  ejs.renderFile(ejsFilePath, { data: resume }, (err, html) => {
    if (err) {
      console.log(err)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("oops")
    }
    res.status(200).send(html)
  })
}

const updateResume = async (req, res) => {
  res.send("hello there")
}


module.exports = { postResume, getResume, updateResume }