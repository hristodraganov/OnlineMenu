const express = require('express')
const router = express.Router()

const product_controller = require('../controllers/product')

router.put('/update', product_controller.update_product_put)
router.get('/get/names/:sub_category', product_controller.fetch_products_names_get)
router.delete('/delete/:item', product_controller.delete_one_product_delete)
router.get('/get', product_controller.fetch_all_products_get)
router.post('/add', product_controller.insert_product_post)
router.get('/get/:sub_category', product_controller.fetch_products_get)
router.get('/get/one/:productName', product_controller.fetch_single_product_get)
module.exports = router