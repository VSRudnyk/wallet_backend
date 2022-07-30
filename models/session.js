const {Schema, model} = require("mongoose");
const Joi = require("joi");

const sessionSchema = Schema({
  uid: {
    type: String,
    required: true,
  }
});

const joiSessionSchema = Joi.object({
  uid: Joi.string().required(),
})

const Session = model("session", sessionSchema)

module.exports = {Session, joiSessionSchema}