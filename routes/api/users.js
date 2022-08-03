// обробник маршрутів, що стосуються вибраного користувача, тут будуть всі запити по цьому
const express = require('express');

// const { validation, ctrlWrapper } = require("../../middlewares");
const { auth } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { users: ctrl } = require('../../controllers');
// const { joiLoginSchema, joiRegisterSchema } = require("../../models/user");
const router = express.Router();
// напишемо запит на вибраного користувача - це гет -запит
// router.get(
//   "/current",
//   // тут получається що цей запит зможе зробити лише користувач який залогінений,  не треба обертаємо в трай кетч, бо там можуть викидатися помилки, бо цей трай кетч є в самій мідлварі
//   // ctrlWrapper(auth),
//   auth,

//   ctrlWrapper(ctrl.getCurrent)
// );

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
// маршрут для обновлення аватара, обовязково мідлвара аус - не може отримати аватарку той хто ще не залогінився,
//  а другу передаємо мідлвару малтер
// router.patch(
//   "/avatars",
//   auth,
//   upload.single("avatar"),
//   ctrlWrapper(ctrl.updateAvatar)
// );
module.exports = router;
