const express = require('express')
const router = express.Router()

const image_upload_controller = require('../controllers/upload')

router.post('/', image_upload_controller.image_upload_post)

module.exports = router