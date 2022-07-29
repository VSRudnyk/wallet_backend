const Transaction = require("../../models")

const setTransaction = async (req, res) => {
    const {_id: owner} = req.user
    const result = await Transaction.create({...req.body, owner})
    res.status(201).json(result)
}

module.exports = setTransaction;