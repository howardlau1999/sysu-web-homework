const Router = require('../server/urls'),
      ejs = require('ejs'),
      fs = require('fs'),
      render = ejs.compile(fs.readFileSync("./views/register.ejs").toString(), {
          filename: "./views/register.ejs"
      })

module.exports = new Router("/regist", {
    "get": function(req, res) {
        res.status(200).send(render());
    }
});