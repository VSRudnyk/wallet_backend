const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
// ця мідлвара виконує кілька задач:
// 1. перевіряє валідність токена, тобто що ми його видали та що його термін не витік
// 2. витягує з токена айді, знаходить в базі користувача по айді і прикріплює його до запиту (рег.юзер)
// таким чином в любому контролері інфор про того хто питає буде доступна
const { User } = require("../models");
const { SECRET_KEY } = process.env;
const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  // тепер цей рядок треба розділити на 2 частини по пробелу, для цого використовуємо спліт
  const [bearer, token] = authorization.split(" ");

  try {
    // робимо перевірку на слово берер, якщо не = викидаємо помилку = не авторизованийз пакету шттп-ерорз - 401 конструктор - анавторайз, імпортуємо його
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};
module.exports = auth;
// цю мідлвару можна імпортувати в будь=яке місце - в товари, чи ще кудись, таким чином ми отримаємо приватний роутер
