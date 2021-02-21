const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.json(require('../menu/menu.json'))
})

module.exports = router