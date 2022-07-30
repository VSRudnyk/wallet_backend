const { Schema, mongoose, model } = require('mongoose');
const Joi = require('joi');

const sessionSchema = Schema({
  uid: mongoose.Types.ObjectId,
});

const joiSessionSchema = Joi.object({
  sid: Joi.string().required(),
});

const Session = model('session', sessionSchema);

module.exports = { Session, joiSessionSchema };