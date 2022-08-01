const { Schema, model } = require('mongoose');

const Joi = require('joi');

const transactionSchema = Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  category: {
    type: String,
    required: true
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
    ref: 'user',
  },
}, { versionKey: false });

const transactionJoiSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required().default('Main'),
  comment: Joi.string(),
  sum: Joi.number().required(),
  balance: Joi.number().required(),
});

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
  transactionJoiSchema,
};
