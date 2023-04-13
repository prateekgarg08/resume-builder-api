const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start: String,
  end: String,
  school: String,
  location: String
})

const workExpirenceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  start: String,
  end: String,
  descriptioin: String,
  location: String
})

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  start: String,
  end: String,
  descriptioin: String,

})

const ResumeSchema = new mongoose.Schema({
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
  },
  role: {
    type: String,
    required: [true, 'role is required'],
    maxlength: 20
  },
  location: {
    type: String,
    required: [true, 'location is required'],
    maxlength: 20
  },
  linkedinLink: {
    type: String,
  },
  education: {
    type: Array,
    items: educationSchema,
    required: [true, 'education is required']
  },
  skills: {
    type: Array,
    items: String,

  },
  workExperience: {
    type: Array,
    items: workExpirenceSchema,
    required: true

  },
  projects: {
    type: Array,
    items: projectSchema,
    required: true

  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }

})

module.exports = mongoose.model('Resume', ResumeSchema)