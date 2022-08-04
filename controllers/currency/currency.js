const { default: axios } = require('axios');

const date = new Date();
const day = date.getDay();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const getCurrency = async (req, res) => {
  const data = await axios(
    `https://api.privatbank.ua/p24api/exchange_rates?json&date=${day}.${month}.${year}`
  );
  res.status(200).json(data.data);
};

module.exports = getCurrency;
