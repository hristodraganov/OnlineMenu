const db = require("../db")


exports.insert_order_post = async (req, res) => {
    try {
        const order = await db.query('INSERT INTO _order (created_at, table_number) values ($1, $2) returning *', [
            req.body.date,
            req.body.table
        ])
        req.body.cart.map(async item => {
            const singleInsert = await db.query(
                'INSERT INTO order_product (order_id, prod_name, prod_price, prod_quantity) values ($1, $2, $3, $4)',
                [
                    order.rows[0].id,
                    item.name,
                    item.price,
                    item.quantity
                ])
        })
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Your order was successfully placed!',
                order: order.rows[0]
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was a problem posting your order entry.'
            }
        })
    }
}
exports.fetch_orders_by_table_number_get = async (req, res) => {

    try {
        const results = await db.query('SELECT * from _order WHERE table_number = $1', [req.params.table])
        let ordersList = []
        for (let i = 0; i < results.rows.length; i++) {
            let data = await db.query('SELECT * from order_product WHERE order_id = $1', [results.rows[i].id])
            ordersList.push({ order: results.rows[i], orderProducts: data.rows })
        }
        res.status(201).json({
            status: 'success',
            data: {
                orders: ordersList
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem in fetching orders by table number.'
            }
        })
    }
}
exports.fetch_orders_by_date_get = async (req, res) => {
    const from = req.params.from.replace("T", " ").slice(0, -5);
    const to = req.params.to.replace("T", " ").slice(0, -5);
    try {
        const results = await db.query('SELECT * from _order WHERE created_at BETWEEN $1 AND $2',
            [from, to])
        let ordersList = []
        for (let i = 0; i < results.rows.length; i++) {
            let data = await db.query('SELECT * from order_product WHERE order_id = $1', [results.rows[i].id])
            ordersList.push({ order: results.rows[i], orderProducts: data.rows })
        }
        res.status(201).json({
            status: 'success',
            data: {
                orders: ordersList
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem in fetching orders by date.'
            }
        })
    }
}



exports.fetch_orders_get = async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM _order')
        let ordersList = []
        for (let i = 0; i < results.rows.length; i++) {
            let data = await db.query('SELECT * from order_product WHERE order_id = $1', [results.rows[i].id])
            ordersList.push({ order: results.rows[i], orderProducts: data.rows })
        }
        res.status(201).json({
            status: 'success',
            data: {
                orders: ordersList
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'There was problem in fetching orders.'
            }
        })
    }
}