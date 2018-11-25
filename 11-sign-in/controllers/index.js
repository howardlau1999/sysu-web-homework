const detail = require("./detail"),
      register = require("./register"),
      homepage = require("./homepage"),
      login = require("./login"),
      api = require("./api");

module.exports = [
    detail,
    register,
    login,
    homepage,
    ...api
];