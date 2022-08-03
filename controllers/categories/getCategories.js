const {Transaction} = require("../../models")

const getCategories = async (req, res) => {
  const {_id} = req.user;
  const result = await Transaction.aggregate([
  {
    '$match': {
      'owner': _id, 
      'type': 'expense'
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
        '$push': {
          'category': '$category', 
          'sum': '$sum'
        }
      }
    }
  }, {
    '$project': {
      '_id': 0
    }
  }
])

res.status(200).json(result);
};

module.exports = getCategories;