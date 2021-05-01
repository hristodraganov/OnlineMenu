const db = require('../db')

exports.insert_category_post = async (req, res) => {

    try {
        await db.query('INSERT INTO category (name, image) values ($1, $2)', [
            req.body.name,
            req.body.imageName
        ])
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Successfully added a category!'
            }
        })
    } catch (error) {
        if (error.code === '23502' || error.code === '23514') {
            res.status(201).json({
                status: 'error',
                data: {
                    msg: 'Please fill in all the category info!'
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
exports.fetch_categories_names_get = async (req, res) => {
    try {
        const result = await db.query('SELECT name FROM category')
        res.status(201).json({
            status: 'success',
            data: {
                categories: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching categories by name.'
            }
        })
    }
}
exports.delete_one_category_delete = async (req, res) => {
    try {
        await db.query('DELETE FROM category WHERE name=$1', [req.params.item])
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Successfully deleted a category.',
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem deleting a category.'
            }
        })
    }
}


exports.fetch_categories_get = async (req, res) => {

    try {
        const result = await db.query('SELECT * FROM category')
        res.status(201).json({
            status: 'success',
            data: {
                categories: result.rows
            }
        })
    } catch (error) {
        res.status(201).json({
            status: 'error',
            data: {
                msg: 'There was problem fetching categories.'
            }
        })
    }
}

