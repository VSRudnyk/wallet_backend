// цей контроллер повинен знати про якого конкретно користувача йде запит
const getCurrent = async (req, res) => {
  // console.log(req.user);
  const { name, email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};
module.exports = getCurrent;
