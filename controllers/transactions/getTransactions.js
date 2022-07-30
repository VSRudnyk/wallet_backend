const {Transaction} = require("../../models")

const getTransactions = async (req, res,) => {
  const {_id: owner} = req.user
  const {page = 1, limit = 5} = req.query
  const skip = (page - 1) * limit
  const result = await Transaction.find({owner}, "-createdAt -updatedAt", {skip, limit: Number(limit)})
    .populate("owner", " _id name email")
  res.json(result)
}

module.exports = getTransactions;