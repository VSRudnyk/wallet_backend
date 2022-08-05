const express = require('express');
const { auth } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { users: ctrl } = require('../../controllers');
const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
