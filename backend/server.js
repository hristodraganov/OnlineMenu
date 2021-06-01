const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const imgUploadRouter = require('./routes/imgUploadRoute')
const categoryRouter = require('./routes/category')
const subCategoryRouter = require('./routes/subCategory')
const productRouter = require('./routes/product')
const ordersRouter = require('./routes/orders')
const statisticsRouter = require('./routes/statistics')
const PORT = 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/images', express.static(__dirname + '/images'))
app.use('/upload', imgUploadRouter)
app.use('/category', categoryRouter)
app.use('/subCategory', subCategoryRouter)
app.use('/product', productRouter)
app.use('/orders', ordersRouter)
app.use('/statistics', statisticsRouter)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, function () {
        console.log('express is running on ' + PORT)
    })
}


module.exports = {
    app
}


