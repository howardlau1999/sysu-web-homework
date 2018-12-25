const ejs = require('ejs'),
    fs = require('fs'),
    middlewares = require('../middlewares'),
    render = ejs.compile(fs.readFileSync('./views/login.ejs', 'UTF-8'), {
        filename: './views/login.ejs'
    }),
    Router = require("../server/urls");

module.exports = new Router('/', {
    "get": function (req, res) {
        if (req.query.username) {
            if (req.user && req.user.username !== req.query.username) {
                res.redirect('/user/detail/wrong_username=true');
                return;
            } else {
                res.redirect('/user/detail');
                return;
            }
        }
        
        if (req.user) {
            res.redirect('/user/detail');
            return;
        }

        res.send(render({
            user: req.user
        }));
    }
}, [middlewares.login]);