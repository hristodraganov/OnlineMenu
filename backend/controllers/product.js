const db = require('../db')

exports.insert_product_post = async (req, res) => {
    try {
        const cat_ID = await db.query('SELECT id FROM category WHERE name = $1', [req.body.product.category])
        const subCat_ID = await db.query('SELECT id FROM sub_category WHERE name = $1', [req.body.product.subCategory])
        const result = await db.query(
            'INSERT INTO product (category_id, sub_category_id, name, description, alergens, price, image) values ($1, $2, $3, $4, $5, $6, $7)',
            [
                cat_ID.rows[0].id,
                subCat_ID.rows[0].id,
                req.body.product.name,
                req.body.product.description,
                req.body.alergens.join(','),
                req.body.product.price,
                req.body.product.imageName
            ])
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Successfully added a product!'
            }
        })
    } catch (error) {
        if (error.code === '23502' || error.code === '23514') {
            res.status(201).json({
                status: 'error',
                data: {
                    msg: 'Please fill in all the product info!'
                }
            })
        } else {
            res.status(201).json({
                status: 'error',
                data: {
                    msg: 'Something went wrong, please try again.'
                }
            })
        }
    }
}
exports.fetch_all_products_get = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM product')
        res.status(201).json({
            status: 'success',
            data: {
                products: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching all products.'
            }
        })
    }
}

exports.delete_one_product_delete = async (req, res) => {
    try {
        await db.query('DELETE FROM product WHERE name=$1', [req.params.item])
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Successfully deleted a product.',
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was a problem deleting a product.'
            }
        })
    }
}
exports.update_product_put = async (req, res) => {
    try {
        await db.query('UPDATE product SET name = $1, description = $2, price = $3, alergens = $4, image = $5 WHERE name = $6', [
            req.body.product.name,
            req.body.product.description,
            req.body.product.price,
            req.body.alergens.join(','),
            req.body.product.imageName,
            req.body.oldProductName
        ])
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Successfully updated a product!'
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was a problem in updating a product.'
            }
        })
    }
}

exports.fetch_products_names_get = async (req, res) => {
    try {
        const sub_cat_ID = await db.query('SELECT id FROM sub_category WHERE name = $1', [req.params.sub_category])
        const result = await db.query('SELECT name FROM product WHERE sub_category_id = $1', [sub_cat_ID.rows[0].id])
        res.status(201).json({
            status: 'success',
            data: {
                products: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching products by name.'
            }
        })
    }
}
exports.fetch_products_get = async (req, res) => {
    try {
        const sub_cat_ID = await db.query('SELECT id FROM sub_category WHERE name = $1', [req.params.sub_category])
        const result = await db.query('SELECT * FROM product WHERE sub_category_id = $1', [sub_cat_ID.rows[0].id])
        res.status(201).json({
            status: 'success',
            data: {
                products: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching products.'
            }
        })
    }
}

exports.fetch_single_product_get = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM product WHERE name = $1', [req.params.productName])
        res.status(201).json({
            status: 'success',
            data: {
                product: result.rows[0]
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching a product.'
            }
        })
    }
}