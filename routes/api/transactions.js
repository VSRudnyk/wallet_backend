const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const {validation, auth} = require("../../middlewares")

const {transactionJoiSchema} = require("../../models/transaction")

const { transactions: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/transactions", auth, ctrlWrapper(ctrl.getTransactions));
router.post("/transactions", validation(transactionJoiSchema), ctrlWrapper(ctrl.setTransaction));


module.exports = router;

