const mongoose = require('mongoose')
const { Schema } = mongoose;

const adviceSchema = new Schema({
    id: {
       type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tips_title_1: {
        type: String
    },
    tips_title_2: {
        type: String
    },
    tips_title_3: {
        type: String
    },
    tips_title_4: {
        type: String
    },
    tips_title_5: {
        type: String
    },
    tips_para_2: {
        type: String
    },
    tips_para_3: {
        type: String
    },
    tips_para_4: {
        type: String
    },
    tips_para_5: {
        type: String
    },
    conclusion: {
        type: String
    },
    image: {
        type: String
    },
});

const Advice = mongoose.model('Advice', adviceSchema, 'advices');

module.exports = Advice;