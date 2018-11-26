const detail = require("./detail"),
      register = require("./register"),
      homepage = require("./homepage"),
      login = require("./login"),
      regist = require("./regist"),
      api = require("./api");

module.exports = [
    detail,
    regist,
    register,
    login,
    homepage,
    ...api
];