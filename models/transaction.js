const {Schema, model} = require("mongoose");

const Joi = require("joi");

const transactionSchema = Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  transType: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
  },
  comment: {
    type: String,
  },
  sum: {
    type: Number,
  },
  balance: {
    type: Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
}, {versionKey: false})

const transactionJoiSchema = Joi.object({
  transType: Joi.boolean(),
  category: Joi.string().required(),
  comment: Joi.string(),
  sum: Joi.number().required(),
  balance: Joi.number().required()
})


const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  transactionJoiSchema
};
