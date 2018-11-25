const Router = require('../server/urls'),
      ejs = require('ejs'),
      fs = require('fs'),
      render = ejs.compile(fs.readFileSync("./views/login.ejs").toString(), {
          filename: "./views/login.ejs"
      })

module.exports = new Router("/user/login", {
    "get": function(req, res) {
        res.status(200).send(render());
    }
});