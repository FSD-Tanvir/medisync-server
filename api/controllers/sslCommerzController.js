const SSLCommerzModel = require('../models/sslCommerz')

// post payment data
const postPaymet = async (req, res) => {
    console.log(req.body)
    // try {
    //     const newOrder = new SSLCommerzModel(req.body)
    //     console.log(newOrder)
    // } catch (error) {
    //     res.status(500).json({
    //         status: false,
    //         message: err.message,
    //     });
    // }

}

module.exports = {
    postPaymet
}