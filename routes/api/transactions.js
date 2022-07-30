const express = require("express");

const {ctrlWrapper} = require("../../helpers");

const {validation, auth} = require("../../middlewares")

const {transactionJoiSchema} = require("../../models/transaction")

const {transactions: ctrl} = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getTransactions));
router.post("/", auth, validation(transactionJoiSchema), ctrlWrapper(ctrl.setTransaction));
router.delete("/:id", ctrlWrapper(ctrl.delTransaction));


module.exports = router;

