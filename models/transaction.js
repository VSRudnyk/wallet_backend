const {Schema, model} = require("mongoose");

const Joi = require("joi");

const transactionSchema = Schema({
    date: {
        type: new Date(),
        required: true,
    },
    transType: {
        type: Boolean,
        default: false,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
    sum: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
})

const transactionJoiSchema = Joi.object({
    date: Joi.date().required(),
    transType: Joi.string().required(),
    category: Joi.string().required(),
    comment: Joi.string().required(),
    sum: Joi.number().required(),
    balance: Joi.number().required()
})


const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    transactionJoiSchema
};