const express = require('express')
const router = express.Router()

const category_controller = require('../controllers/category')

router.delete('/delete/:item', category_controller.delete_one_category_delete)
router.post('/add', category_controller.insert_category_post)
router.get('/get', category_controller.fetch_categories_get)
router.get('/get/names', category_controller.fetch_categories_names_get)
module.exports = router