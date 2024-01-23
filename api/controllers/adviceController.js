const Advice = require('../models/Advice')

const getAllAdvices = async (req, res) => {
    try {
        const advices = await Advice.find();
        res.status(200).json(advices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllAdvices }

