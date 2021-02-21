const mongoose = require('mongoose')

const orderSchema = {
    table: Number,
    order: {type: Array, default: []},
    date: Number
}

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
