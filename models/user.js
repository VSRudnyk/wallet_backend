const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

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
      //   match:
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // потрібно дописати токен щоб зберігати його в базі при логіні і при логауті видаляти його
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
// 2 спосіб для зберігання паролей захешированих в базі - не дуже популярний, але зустрічається
// // тут ми добавимо схемі метод setPassword як функцію і передаємо їй паспорт
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
// добавляємо ще один метод для порівняння паролів що ввів користувач з тим, що є в базі захеширований
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// створюємо джоі-схему
const joiRegisterSchema = Joi.object({
  name: Joi.string().min(1).max(12).required(),
  email: Joi.string()
    .email({ tlds: { deny: ["ru", "su", "рус", "рф", "москва"] } })
    .error((errors) => new Error("enter valid email except .ru"))
    .min(6)
    .required(),
  password: Joi.string().min(6).max(12).required(),
  // password: Joi.string()
  //   .min(6)
  //   .max(12)
  //   .pattern(strongRegex)
  //   .error(
  //     (errors) =>
  //       new Error(
  //         "паспорт має містити латинські літери - хоча б 1 прописну, 1 заглавну, 1 цифру і бути не менше 6 та не більше 12 символів  "
  //       )
  //   )
  //   .required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { deny: ["ru", "su", "рус", "рф", "москва"] } })
    .error((errors) => new Error("enter valid email except .ru"))
    .min(6)
    .required(),
  // password: Joi.string()
  //   .min(6)
  //   .max(16)
  //   .pattern(strongRegex)
  //   .error(
  //     (errors) =>
  //       new Error(
  //         "паспорт має містити латинські літери - хоча б 1 прописну, 1 заглавну, 1 цифру і бути не менше 6 та не більше 16 символів  "
  //       )
  //   )
  //   .required(),
  password: Joi.string().min(6).max(12).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
