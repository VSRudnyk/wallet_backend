const { Transaction } = require('../../models');

const getTransactions = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Transaction.find({ owner }, '-createdAt -updatedAt').populate('owner', ' _id name email');
  res.json(result);
};

module.exports = getTransactions;
