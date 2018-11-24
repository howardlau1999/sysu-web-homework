const database = require("../utils/database"),
    render = require("../utils/render"),
    Router = require("../server/urls"),
    url = require('url');

function POST(req, res) {
    let json = '';

    req.on('data', function (data) {
        json += data;
    });
    req.on('end', function () {
        const query = JSON.parse(json);
        if (!query) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                type: 'empty query'
            }));
            return;
        }

        let new_user = {};

        const keys = ['username', 'stuid', 'email', 'phone'];

        for (const key of keys) {
            if (!query[key]) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    type: 'missing',
                    field: key
                }));
                return;
            }

            new_user[key] = query[key];
        }

        let validations = {
            "username": /^[a-zA-Z]\w{5,17}$/,
            "stuid": /^[1-9]\d{7}$/,
            "phone": /^[1-9]\d{10}$/,
            "email": /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
        } ;

        for (const key of keys) {
            if (!validations[key].test(new_user[key])) {
                res.statusCode = 400;
                res.end(JSON.stringify({
                    'type': 'invalid',
                    'field': key
                }));
                return;
            }
        }

        for (const key of keys) {
            try {
                database.User.find_one(key, new_user[key]);
                res.statusCode = 400;
                res.end(JSON.stringify({
                    'type': 'exists',
                    'field': key
                }));
                return;
            } catch (e) {
                continue;
            }
        }


        database.User.insert(new_user);
        res.statusCode = 200;
        res.end(JSON.stringify({
            'success': true
        }));
    });

}

module.exports = new Router('/api/v1/register', {
    "POST": POST
});