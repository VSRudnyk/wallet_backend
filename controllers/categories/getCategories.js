const { Transaction } = require('../../models');

const getCategories = async (req, res) => {
  const { _id } = req.user;
  const expense = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: 'expense',
      },
    },
    {
      $group: {
        _id: {
          type: 'expense',
          month: {
            $month: '$date',
          },
          year: {
            $year: '$date',
          },
        },
        totalPrice: {
          $sum: '$sum',
        },
        category: {
          $push: {
            category: '$category',
            sum: '$sum',
          },
        },
      },
    },
  ]);

  const income = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: 'income',
      },
    },
    {
      $group: {
        _id: {
          type: 'income',
          month: {
            $month: '$date',
          },
          year: {
            $year: '$date',
          },
        },
        totalPrice: {
          $sum: '$sum',
        },
      },
    },
  ]);

  const result = [...expense, ...income];

  res.status(200).json(result);
};

module.exports = getCategories;
