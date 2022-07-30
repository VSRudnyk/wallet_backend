const { Unauthorized, NotFound } = require('http-errors');
const jwt = require('jsonwebtoken');
// ця мідлвара виконує кілька задач:
// 1. перевіряє валідність токена, тобто що ми його видали та що його термін не витік
// 2. витягує з токена айді, знаходить в базі користувача по айді і прикріплює його до запиту (рег.юзер)
// таким чином в любому контролері інфор про того хто питає буде доступна
const { User, Session } = require('../models');
const { JWT_ACCESS_SECRET_KEY } = process.env;
const auth = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if (authorizationHeader) {
    const accessToken = authorizationHeader.replace('Bearer ', '');
    let payload = {};
    try {
      payload = jwt.verify(accessToken, JWT_ACCESS_SECRET_KEY);
    } catch (err) {
      throw new Unauthorized('Not authorized');
    }

    const user = await User.findById(payload.uid);
    const session = await Session.findById(payload.sid);

    if (!user) {
      throw new NotFound('Invalid user');
    }
    if (!session) {
      throw new NotFound('Invalid session');
    }

    req.user = user;
    req.session = session;
    next();
  } else return res.status(400).send({ message: 'No token provided' });
};


module.exports = auth;

