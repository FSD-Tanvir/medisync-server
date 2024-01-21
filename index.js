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
        console.log("mongoose connected sucessfully")
    )
    .catch((error) => {
        console.log("error connecting tomongodb", error)
    })


app.get('/', (req, res) => {
    res.send('medisync project is running')
})

app.listen(port, () => {
    console.log(`medisync running on port ${port}`)
})