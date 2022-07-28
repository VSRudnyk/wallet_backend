const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { transactions: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/transactions", ctrlWrapper(ctrl.getTransactions));
router.post("/transactions", ctrlWrapper(ctrl.setTransaction));


module.exports = router;

