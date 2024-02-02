const Advice = require('../models/Advice')

const getAllAdvices = async (req, res) => {
    try {
        const advices = await Advice.find();
        res.status(200).json(advices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAnAdvice = async (req, res) => {
    const newAdvice = new Advice(req.body);
    const result = await newAdvice.save();
    res.send(result)
};
const deleteAdvice = async (req, res) => {
    const id = req.params.id;
    const result = await Advice.deleteOne({ _id: id })
    res.send(result)
}
const updateAdvice = async (req, res) => {
    console.log('update id...', req.params.id);
    console.log('update data...', req.body);
    const updateInfo = req.body;

    const result = await Advice.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            "title": updateInfo?.title,
            "description" : updateInfo?.description,
            "tips_title_1" : updateInfo?.tips_title_1,
            "tips_title_2" : updateInfo?.tips_title_2,
            "tips_para_2" : updateInfo?.tips_para_2,
            "tips_title_3" : updateInfo?.tips_title_3,
            "tips_para_3" : updateInfo?.tips_para_3,
            "tips_title_4" : updateInfo?.tips_title_4,
            "tips_para_4" : updateInfo?.tips_para_4,
            "tips_title_5" : updateInfo?.tips_title_5,
            "tips_para_5" : updateInfo?.tips_para_5,
            "conclusion" : updateInfo?.conclusion,
            "image" : updateInfo?.image
        }
    },
        { new: true }
    )
    console.log('result', result);
    res.send(result)
}

module.exports = { getAllAdvices, addAnAdvice, deleteAdvice, updateAdvice }

