const {Transaction} = require("../../models")

const delTransaction = async (req, res) => {
  const {id: _id} = req.params
  await Transaction.findByIdAndDelete(_id)
  res.json({ 
    message: "transaction deleted",
  })
}

module.exports = delTransaction