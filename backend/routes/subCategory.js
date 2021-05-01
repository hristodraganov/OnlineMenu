const express = require('express')
const router = express.Router()

const subCategory_controller = require('../controllers/subCategory')

router.delete('/delete/:item', subCategory_controller.delete_one_sub_category_delete)
router.get('/get', subCategory_controller.fetch_all_sub_categories_get)
router.post('/add', subCategory_controller.insert_sub_category_post)
router.get('/get/:group', subCategory_controller.fetch_sub_categories_get)
router.get('/get/names/:name', subCategory_controller.fetch_sub_categories_names_get)
module.exports = router