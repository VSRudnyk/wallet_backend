const express = require('express');

const getCurrency = require('../../controllers/currency/currency');

const router = express.Router();

router.get('/', getCurrency);

module.exports = router;
