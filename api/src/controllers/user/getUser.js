const userService = require("../../services/user");

const getUser = (req, res) => {
  userService
    .getUserService(req, res)
    .then((token) => {
      res.status(422).json(token).send();
    })
    .catch((e) => {
      res.send(e);
    });
};

module.exports = getUser;