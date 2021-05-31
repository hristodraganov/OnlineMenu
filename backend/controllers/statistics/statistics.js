const db = require("../../db")
const updates = require('./update')
const findDuplicates = require('./findDuplicates')
const removeDuplicates = require('./removeDuplicates')
const replaceDuplicates = require('./replaceDuplicates')



exports.fetch_most_popular_table_by_date_get = async (req, res) => {
    try {
        const orders = await db.query('SELECT * from _order WHERE created_at BETWEEN $1 AND $2',
            [req.params.from, req.params.to], (err) => {
                if (err) throw err
            })
        let updatedOrders = orders.rows.map(item => { return { tableNumber: item.table_number, timesUsed: updates.getOccurrence(orders.rows, item.table_number) } })

        let filtered = removeDuplicates(updatedOrders, 'tableNumber')
        res.status(201).json({
            status: 'success',
            data: {
                tables: filtered
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching data.'
            }
        })
    }
}

exports.fetch_most_sold_product_by_date_get = async (req, res) => {
    try {
        const orders = await db.query('SELECT * from _order WHERE created_at BETWEEN $1 AND $2',
            [req.params.from, req.params.to], (err) => {
                if (err) throw err
            })
        let ordersList = []
        for (let i = 0; i < orders.rows.length; i++) {
            let data = await db.query('SELECT * from order_product WHERE order_id = $1', [orders.rows[i].id])
            ordersList.push(data.rows)
        }

        let flattedOrders = [].concat(...ordersList)
        let duplicates = findDuplicates(flattedOrders, 'prod_name')
        duplicates = updates.updateQuantities(duplicates, flattedOrders, 'prod_name')
        let filtered = removeDuplicates(flattedOrders, 'prod_name')
        filtered = replaceDuplicates(filtered, duplicates, 'prod_name')
        res.status(201).json({
            status: 'success',
            data: {
                info: filtered
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching data.'
            }
        })
    }
}
exports.fetch_over_all_products_income_get = async (req, res) => {
    try {
        const products = await db.query('SELECT (prod_quantity, prod_name, prod_price) from order_product INNER JOIN product ON (order_product.prod_name = product.name)')
        let array = products.rows.map(item => { return item.row.replace(/[\(\)]/g, "").replace(/["']/g, "").split(',') })
        let objects = []
        for (let i = 0; i < array.length; i++) {
            objects.push({ prod_quantity: parseInt(array[i][0]), prod_name: array[i][1], prod_price: parseFloat(array[i][2]) })
        }
        let duplicates = findDuplicates(objects, 'prod_name')
        duplicates = updates.updateQuantities(duplicates, objects, 'prod_name')
        let filtered = removeDuplicates(objects, 'prod_name')
        filtered = replaceDuplicates(filtered, duplicates, 'prod_name')
        objects = []
        for (let i = 0; i < filtered.length; i++) {
            objects.push({ income: filtered[i].prod_quantity * filtered[i].prod_price, prod_name: filtered[i].prod_name })
        }
        res.status(201).json({
            status: 'success',
            data: {
                products: objects
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching data.'
            }
        })
    }
}
exports.fetch_over_all_sold_by_sub_categories_get = async (req, res) => {
    try {
        const category = await db.query('SELECT id from category WHERE name = $1', [req.params.category])

        let data = await db.query(
            'SELECT (prod_quantity, prod_name, sub_category_id) from order_product INNER JOIN product ON (order_product.prod_name = product.name) WHERE category_id = $1',
            [category.rows[0].id]
        )

        let array = data.rows.map(item => { return item.row.replace(/[\(\)]/g, "").replace(/["']/g, "").split(',') })

        let objects = []

        for (let i = 0; i < array.length; i++) {
            let subCategoryName = await db.query('SELECT (name) from sub_category WHERE id=$1', [parseInt(array[i][2])])
            objects.push({ prod_quantity: parseInt(array[i][0]), subCategoryName: subCategoryName.rows[0].name })
        }

        let duplicates = findDuplicates(objects, 'subCategoryName')
        duplicates = updates.updateQuantities(duplicates, objects, 'subCategoryName')
        let filtered = removeDuplicates(objects, 'subCategoryName')
        filtered = replaceDuplicates(filtered, duplicates, 'subCategoryName')

        res.status(201).json({
            status: 'success',
            data: {
                info: filtered
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching data.'
            }
        })
    }
}



