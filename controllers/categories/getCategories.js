const getCategories = async (req, res) => {
  const data = ["Main", "Food", "Auto", "Reset", "Development", "Children", "House", "Education" ]
  res.status(200).send(data);
};

module.exports = getCategories;