const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

// const bcrypt = require("bcryptjs");
const login = async (req, res) => {
  // витягуємо з тіла запиту емейл і пароль
  //   console.log(req.body);
  const { email, password } = req.body;
  // шукаємо по емейлу юзера
  const user = await User.findOne({ email });

  //   // якщо ми не знайшли користувача, то викидаємо 401 помилку - не авторизований
  //   if (!user) {
  //     throw new Unauthorized(`Email ${email} not found`);
  //   }
  //   // якщо користувач є = то намм потрібно перевірити пароль, через бкрипт - компаерсинг - порівнюємо захеширований пароль отриманий з бази, з тим що ввів користувач
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) {
  //     throw new Unauthorized("Password wrong");
  //   }
  // це порівняння можна зробити ще по іншому - йдемо в моделі і добавляємо ще один метод
  // оскільки ми створюємо юзера як нового обєкта моделі, то у нього будуть всі методи моделі юзер і метод компаре пасс
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or Password is wrong");
  }
  // ще один варіант
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!user || !passCompare) {
  //     throw new Unauthorized("Email or Password is wrong");
  //   }

  // створюємо  пейлоад,  в  якому айді= юзер_айді, який пройшов перевірку
  const payload = {
    id: user._id,
  };
  // створюємо токе через жвт сайн і передаємо  туди пейлоад,  секретний  ключ  і  трет ій аргумент - час,  за який токен б уде валідним
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  // запишемо токен(збережемо його) в базу  для юзерайді, дя того хто зараз залогінівся -обновити поле токен і потім відправляємо
  await User.findByIdAndUpdate(user._id, { token });
  //   і відправляємо його(заголовки вписуються автоматично)
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        name: user.name,
        // avatarURL: user.avatarURL,
      },
    },
  });
};

module.exports = login;
