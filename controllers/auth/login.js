const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

// const bcrypt = require("bcryptjs");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or Password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id);

  // запишемо токен(збережемо його) в базу  для юзерайді, дя того хто зараз залогінівся -обновити поле токен і потім відправляємо
  // await User.findByIdAndUpdate(user._id, { token });
  //   і відправляємо його(заголовки вписуються автоматично)
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        name: user.name,
      },
    },
  });
};

module.exports = login;
