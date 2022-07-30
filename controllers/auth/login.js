const { User, Session } = require('../../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = process.env;

// const bcrypt = require("bcryptjs");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or Password is wrong');
  }

  const newSession = await Session.create({
    uid: user._id,
  });

  const accessToken = jwt.sign({ uid: user._id, sid: newSession._id }, JWT_ACCESS_SECRET_KEY, { expiresIn: 60 });
  const refreshToken = jwt.sign({ uid: user._id, sid: newSession._id }, JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });
  await User.findByIdAndUpdate(user._id);

  // запишемо токен(збережемо його) в базу  для юзерайді, дя того хто зараз залогінівся -обновити поле токен і потім відправляємо
  // await User.findByIdAndUpdate(user._id, { token });
  //   і відправляємо його(заголовки вписуються автоматично)
  res.json({
    status: 'success',
    code: 200,
    data: {
      sid: newSession._id,
      accessToken,
      refreshToken,
      user: {
        email,
        name: user.name,
      },
    },
  });
};

module.exports = login;
