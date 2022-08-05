const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})(?!.*\s)/;

const userSchema = Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxLength: 12,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  name: Joi.string().min(1).max(16).required(),
  email: Joi.string()
    .email({ tlds: { deny: ['ru', 'su', 'рус', 'рф', 'москва'] } })
    .error(errors => new Error('enter valid email except .ru'))
    .min(6)
    .required(),
  password: Joi.string()
    .min(6)
    .max(12)
    .pattern(strongRegex)
    .error(
      errors =>
        new Error(
          'the passport must contain Latin letters - at least 1 uppercase, 1 uppercase, 1 number and be at least 6 characters '
        )
    )
    .required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { deny: ['ru', 'su', 'рус', 'рф', 'москва'] } })
    .error(errors => new Error('enter valid email except .ru'))
    .min(6)
    .required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(strongRegex)
    .error(
      errors =>
        new Error(
          'the passport must contain Latin letters - at least 1 uppercase, 1 uppercase, 1 number and be at least 6 characters '
        )
    )
    .required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
