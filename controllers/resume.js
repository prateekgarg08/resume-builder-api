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

  const userId = req.user.userId
  const resume = await Resume.findOne({ createdBy: userId })

  if (!resume) {
    res.status(404).send("Not found")
  }
  res.status(200).json({ resume })

}

const updateResume = async (req, res) => {
  res.send("hello there")
}


module.exports = { postResume, getResume, updateResume }