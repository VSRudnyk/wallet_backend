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
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
})

const transactionJoiSchema = Joi.object({
    transType: Joi.boolean().required(),
    category: Joi.string().required(),
    comment: Joi.string(),
    sum: Joi.number().required(),
})


const Transaction = model("transaction", transactionSchema);

module.exports = {
    Transaction,
    transactionJoiSchema
};