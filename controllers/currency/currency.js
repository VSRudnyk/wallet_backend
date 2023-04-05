const { default: axios } = require('axios');

const date = new Date();
const day = date.getDay();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const getCurrency = async (req, res) => {
  const data = await axios(
    `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json`
  );
  res.status(200).json(data.data);
};

module.exports = getCurrency;
