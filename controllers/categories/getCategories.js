const {Transaction} = require("../../models")

const getCategories = async (req, res) => {
  const {_id} = req.user;
  const result = await Transaction.aggregate([
  {
    '$match': {
      'owner': _id, 
      'type': 'income'
    }
  }, {
    '$group': {
      '_id': {
        'month': {
          '$month': '$date'
        }, 
        'year': {
          '$year': '$date'
        }
      }, 
      'totalPrice': {
        '$sum': '$sum'
      }, 
      'category': {
        '$addToSet': '$category'
      }
    }
  }
])

res.status(200).json(result);
};

module.exports = getCategories;