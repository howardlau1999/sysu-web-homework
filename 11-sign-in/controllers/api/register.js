const User = require('../../models/User'),
    Router = require("../../server/urls"),
    bcrypt = require("bcrypt");

function post(req, res, next) {

    const query = req.body;
    if (!query) {
        res.status(400).send({
            type: 'empty query'
        });
        return;
    }

    let new_user = {};

    const keys = ['username', 'stuid', 'email', 'phone', 'password'];

    for (const key of keys) {
        if (!query[key]) {
            res.status(400).send({
                type: 'missing',
                field: key
            });
            return;
        }

        new_user[key] = query[key];
    }

    let validations = {
        "username": /^[a-zA-Z]\w{5,17}$/,
        "stuid": /^[1-9]\d{7}$/,
        "phone": /^[1-9]\d{10}$/,
        "email": /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "password": /^[0-9a-zA-Z\-_]{6,12}$/,
    };

    for (const key of Object.keys(validations)) {
        if (!validations[key].test(new_user[key])) {
            res.status(400).send({
                'type': 'invalid',
                'field': key
            });
            return;
        }
    }

    const duplications = {
        "username": true,
        "email": true,
        "stuid": true,
        "phone": true
    };
    var conflicted = false;

    for (const key of Object.keys(duplications)) {
        let user = {};
        user[key] = new_user[key];
        User.findOne(user, function (err, user) {
            if (user) {
                if (conflicted) return;
                res.status(400).send({
                    type: 'conflict',
                    field: key
                }).end();
                conflicted = true;
            } else {
                duplications[key] = false;

                for (const key of Object.keys(duplications)) {
                    if (duplications[key]) return;
                }

                new_user['password'] = bcrypt.hashSync(new_user['password'], 10);

                User.create(new_user, function (err, user) {
                    if (err) return next(err);
                    else {
                        res.status(200).send({
                            'success': true,
                            'user': user
                        });
                    }
                });
            }
        })
    }
}

module.exports = new Router('/api/v1/register', {
    "post": post
});