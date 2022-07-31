const { default: axios } = require('axios');

const getCurrency = async (req, res) => {
  const data = await axios(
    'https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014'
  );
  res.status(200).json(data.data);
};

module.exports = getCurrency;
