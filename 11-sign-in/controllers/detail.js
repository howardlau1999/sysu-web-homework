const middlewares = require("../middlewares"),
    Router = require("../server/urls"),
    ejs = require('ejs'),
    fs = require('fs'),
    render = ejs.compile(fs.readFileSync("./views/detail.ejs").toString(), {
        filename: "./views/detail.ejs"
    });

function get(req, res) {
    try {
        res.status(200).send(render({
            user: req.user,
            wrong_username: req.query.wrong_username
        }));
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.end("Internal server error");
    }
}

module.exports = new Router('/user/detail', {
    "get": get
}, [middlewares.require_login]);