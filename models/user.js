const { Schema, model } = require("mongoose");
// можна використи 2 спосіб збереження користувача в базі з хешированим паролем
const bcrypt = require("bcryptjs");
// в цьому ж файлі зручно робити схему перевірку джоі
const Joi = require("joi");

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
  // у джоя есть свій варіант емейла, в якому теж аикористовується регулярний вираз, тому краще все таки використовувати патерн,
  // якщо ми захочемо добавити в модель свій регулярний вираз, то ми не можемо бути впевнені, що вони співпадуть з виразом в джої
  //   email: Joi.string().email().required(),
  //   email: Joi.string().patten().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
});
// нова схема для патча, де перевіряється лише одне поле , яке ми обновляємо - статус, наприклад
// const statusJoiSchema = Joi.object({
//   status: Joi.string().valid("basic", "sale", "stock").required(),
// });

// щоб створити модель ми функції модел  передаємо назву колекції з якою будемо працювати в однині, та назву схеми
const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
