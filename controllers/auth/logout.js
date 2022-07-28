const { User } = require("../../models");
const logout = async (req, res) => {
  // беремо айді того хто хоче розлогінитись, він сюди доходить з мідлвари аус
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
