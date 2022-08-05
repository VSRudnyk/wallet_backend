const { User, Session } = require('../../models');
const { Unauthorized, NotFound, BadRequest } = require('http-errors');
const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

const refreshTokens = async (req, res) => {
  const authorizationHeader = req.headers.cookie;
  if (authorizationHeader) {
    const activeSession = await Session.findById(req.body.sid);
    if (!activeSession) {
      throw new NotFound('Invalid session');
    }

    const reqRefreshToken = authorizationHeader.replace('refreshToken=', '');

    let payload = {};
    try {
      payload = jwt.verify(reqRefreshToken, JWT_REFRESH_SECRET_KEY);
    } catch (err) {
      await Session.findByIdAndDelete(req.body.sid);
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

    await Session.findByIdAndDelete(payload.sid);
    const newSession = await Session.create({
      uid: user._id,
    });

    const newAccessToken = jwt.sign({ uid: user._id, sid: newSession._id }, JWT_ACCESS_SECRET_KEY, { expiresIn: '1h' });
    const newRefreshToken = jwt.sign({
      uid: user._id,
      sid: newSession._id,
    }, JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });

    res.cookie('refreshToken', newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.json(
      {
        status: 'success',
        code: 200,
        data: {
          newSid: newSession._id,
          newAccessToken,
        },
      },
    );
  }
  throw new BadRequest('No token provided');
};

module.exports = refreshTokens;