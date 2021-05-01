const express = require('express')
const router = express.Router()

const statistics_controller = require('../controllers/statistics/statistics')

router.get('/get/products/:from/:to', statistics_controller.fetch_most_sold_product_by_date_get)
router.get('/get/tables/:from/:to', statistics_controller.fetch_most_popular_table_by_date_get)
router.get('/get/overall/product/income', statistics_controller.fetch_over_all_products_income_get)
router.get('/get/overall/:category', statistics_controller.fetch_over_all_sold_by_sub_categories_get)
module.exports = router