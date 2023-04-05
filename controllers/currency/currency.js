const { default: axios } = require('axios');

const date = new Date();
const year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();

if (day < 10) day = '0' + day;
if (month < 10) month = '0' + month;

const getCurrency = async (req, res) => {
  const data = await axios(
    `https://api.privatbank.ua/p24api/exchange_rates?date=${day}.${month}.${year}`
  );
  res.status(200).json(data.data);
};

module.exports = getCurrency;
