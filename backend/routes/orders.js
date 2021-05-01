const express = require('express')
const router = express.Router()

const orders_controller = require('../controllers/orders')

router.get('/get/byDate/:from/:to', orders_controller.fetch_orders_by_date_get)
router.get('/get/byTable/:table', orders_controller.fetch_orders_by_table_number_get)
router.post('/post', orders_controller.insert_order_post)
router.get('/get/all', orders_controller.fetch_orders_get)
module.exports = router