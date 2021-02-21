const { response } = require('express')
const express = require('express')
const router = express.Router()
const Order = require('../models/OrderModel')

router.route('/postOrder').post((req, res) => {
    const table = req.body.table
    const orderList = []
    const orderListRaw = req.body.order
    orderListRaw.map(item => {
        const name = item.name
        const price = item.price
        const quantity = item.quantity
        const total = item.total
        const comments = item.comments
        const obj = { name: name, price: price, quantity: quantity, total: total, comments: comments }
        orderList.push(obj)
    })
    const order = new Order()
    order.table = table
    order.order = orderList
    order.date = req.body.date
    order.save()
})

router.route('/orders').get((req, res) => {
    Order.find()
        .then(orders => res.json(orders))
})

router.route('/findByTable').post((req,res) => {
    Order.find({table: req.body.table}, (err, data) => {
        if(err) {
            res.send(500)
        } else {
            res.status(200).send(data)
        }
    })
})
router.route('/findByDate').post((req,res) => {
    Order.find({date: {$gte: req.body.from, $lte: req.body.to}}, (err, data) => {
        if(err) {
            res.send(500)
        } else {
            res.status(200).send(data)
        }
    })
})




module.exports = router