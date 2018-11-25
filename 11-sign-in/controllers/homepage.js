const ejs = require('ejs'),
    fs = require('fs'),
    middlewares = require('../middlewares'),
    render = ejs.compile(fs.readFileSync('./views/index.ejs', 'UTF-8'), {
        filename: './views/index.ejs'
    }),
    Router = require("../server/urls");

module.exports = new Router('/', {
    "get": function (req, res) {
        if (req.query.username) {
            if (req.user && req.user.username !== req.query.username) {
                res.redirect('/user/profile/wrong_username=true');
                return;
            } else {
                res.redirect('/user/profile');
                return;
            }
        }
        res.send(render({
            user: req.user
        }));
    }
}, [middlewares.login]);