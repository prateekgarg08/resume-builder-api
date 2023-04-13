const express = require('express')

const router = express.Router()
const { postResume, getResume, updateResume } = require('../controllers/resume')

router.route('/').post(postResume).patch(updateResume).get(getResume)
// router.route('/:template').get(getResume)

module.exports = router