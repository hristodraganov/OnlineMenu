const db = require('../db')

exports.insert_sub_category_post = async (req, res) => {
    try {
        const cat_ID = await db.query('SELECT id FROM category WHERE name = $1', [req.body.category])
        await db.query('INSERT INTO sub_category (category_id, name, image) values ($1, $2, $3)', [
            cat_ID.rows[0].id,
            req.body.name,
            req.body.imageName
        ])
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Successfully added a subcategory!'
            }
        })
    } catch (error) {
        if (error.code === '23502' || error.code === '23514') {
            res.status(201).json({
                status: 'error',
                data: {
                    msg: 'Please fill in all the subcategory info!'
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
exports.fetch_sub_categories_names_get = async (req, res) => {
    try {
        const cat_ID = await db.query('SELECT id FROM category WHERE name = $1', [req.params.name])
        const result = await db.query('SELECT name FROM sub_category WHERE category_id = $1', [cat_ID.rows[0].id])
        res.status(201).json({
            status: 'success',
            data: {
                sub_categories: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching subcategories.'
            }
        })
    }
}
exports.fetch_all_sub_categories_get = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM sub_category')
        res.status(201).json({
            status: 'success',
            data: {
                sub_categories: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching subcategories.'
            }
        })
    }
}
exports.delete_one_sub_category_delete = async (req, res) => {
    try {
        await db.query('DELETE FROM sub_category WHERE name=$1', [req.params.item])
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Successfully deleted a subcategory.',
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem deleting a subcategory.'
            }
        })
    }
}

exports.fetch_sub_categories_get = async (req, res) => {

    try {
        const cat_ID = await db.query('SELECT id FROM category WHERE name = $1', [req.params.group])
        const result = await db.query('SELECT * FROM sub_category WHERE category_id = $1', [cat_ID.rows[0].id])
        res.status(201).json({
            status: 'success',
            data: {
                sub_category: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching subcategories by category.'
            }
        })
    }
}