const { Session } = require('../../models');

const logout = async (req, res) => {
  const currentSession = req.session;
  await Session.deleteOne({ _id: currentSession._id });
  res.status(204).json();
};

module.exports = logout;
