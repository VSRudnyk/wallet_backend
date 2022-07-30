const {Transaction} = require("../../models")

const delTransaction = async (req, res) => {
  const {id} = req.params
  await Transaction.findByIdAndDelete(id)
  res.json({
    message: "transaction deleted",
  })
}

module.exports = delTransaction