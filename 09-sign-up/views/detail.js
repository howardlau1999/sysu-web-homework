const database = require("../utils/database"),
    render = require("../utils/render"),
    Router = require("../server/urls"),
    url = require('url');

function GET(req, res) {
    const {
        query
    } = url.parse(req.url, true);
    const {
        username
    } = query;

    try {
        let user = database.User.find_one("username", username);
        res.statusCode = 200;
        res.end(render("./templates/detail.html", user));
    } catch (e) {
        if (e instanceof database.NotFoundError) {
            res.statusCode = 301;
            res.setHeader("Location", "./register.html");
            res.end();
        } else {
            res.statusCode = 500;
            res.end("Internal server error");
        }
    }
}

module.exports = new Router('/', {
    "GET": GET
});