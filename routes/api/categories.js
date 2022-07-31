const express = require('express');

const getCategories = require('../../controllers/categories/getCategories');

const router = express.Router();

router.get('/', getCategories);

module.exports = router;
