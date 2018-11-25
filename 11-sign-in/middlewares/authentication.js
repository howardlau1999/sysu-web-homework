const User = require('../models/User');

const require_login = function(req, res, next) {
    if (req.session && req.session.user_id) {
        User.findById(req.session.user_id)
            .exec(function(err, user) {
                if (err) return next(err);
                else if (user) {
                    success = true;
                    req.user = {
                        username: user.username,
                        phone: user.phone,
                        email: user.email,
                        stuid: user.stuid
                    };
                    return next();
                } else {
                    res.redirect('/user/login?redirect=' + encodeURIComponent(req.url));
                }
            });
    } else {
        res.redirect('/user/login?redirect=' + encodeURIComponent(req.url));
    }
}

const login = function(req, res, next) {
    if (req.session && req.session.user_id) {
        User.findById(req.session.user_id)
            .exec(function(err, user) {
                if (err) return next(err);
                else if (user) {
                    success = true;
                    req.user = {
                        username: user.username,
                        phone: user.phone,
                        email: user.email,
                        stuid: user.stuid
                    };
                    return next();
                } else {
                    return next();
                }
            });
    } else {
        next();
    }
}

module.exports = {
    require_login,
    login
}