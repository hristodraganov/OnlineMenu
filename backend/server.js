const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 3001

app.use(cors())
app.use(express.json())

//connect to mongoose
mongoose.connect('mongodb+srv://admin:admin1!@online-menu.pkd7v.mongodb.net/OrdersDB')
//require route

app.use('/', require('./routes/OrderRoute'))

//api call
app.use('/Menu', require('./routes/Menu'))

app.listen(PORT, function() {
    console.log('express is running on ' + PORT)
})


