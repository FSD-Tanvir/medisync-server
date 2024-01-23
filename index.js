const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.syrsapj.mongodb.net/?retryWrites=true&w=majority`)
    .then(
        console.log("mongoose connected successfully")
    )
    .catch((error) => {
        console.log("error connecting to mongodb", error)
    })



// import route here
const userRoutes = require('./api/routes/useRoutes');
const adviceRoutes = require('./api/routes/adviceRoutes')

const productRoutes = require('./api/routes/productsRoutes')
app.use('/allProducts',productRoutes)

// const userRoutes = require('./api/routes/useRoutes')

app.use('/users', userRoutes)
app.use('/advices', adviceRoutes)



app.get('/', (req, res) => {
    res.send('medisync project is running')
})

app.listen(port, () => {
    console.log(`medisync running on port ${port}`)
})