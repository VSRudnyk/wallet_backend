// обробник маршрутів, що стосуються авторизації та реєстрації, тут будуть всі запити по цьому
const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation } = require("../../middlewares");
// const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiLoginSchema, joiRegisterSchema } = require("../../models/user");
const router = express.Router();
// напишемо запит на реєстрацію - це пост -запити, тому що секретні дані передаються в тілі запиту
// зазвичайпишуть регістер, але можна і сайнап
router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
// щоб написати логін нам потрібно добавити новий маршрутів
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
// router.post("/signup")
// маршрут для розлогінення користувача (може бути пост, може гет, бо немає тіла запиту)
// щоб розлогінити користувача треба знати, хто хоче розлогінитись, тобто знати інфу про залогіненого користувача, тому беремо мідлвару аус, провіряємо хто це
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
