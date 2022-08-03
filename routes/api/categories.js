const express = require('express');

const auth = require('../../middlewares/auth');
const { ctrlWrapper } = require('../../helpers');

const { categories: ctrl } = require('../../controllers');

const router = express.Router();
router.get('/', auth, ctrlWrapper(ctrl.getCategories));

module.exports = router;
