const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { auth, validation } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiLoginSchema, joiRegisterSchema } = require('../../models/user');
const { joiSessionSchema } = require('../../models/session');
const router = express.Router();

router.post(
  '/register',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.post(
  '/refresh',
  validation(joiSessionSchema),
  ctrlWrapper(ctrl.refreshTokens)
);

module.exports = router;
