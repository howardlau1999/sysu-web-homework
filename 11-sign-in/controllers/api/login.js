
const User = require('../../models/User'),
      Router = require('../../server/urls');
 

function post(req, res) {


    const query = req.body;

    if (!query) {
        return res.status(400).send({
            type: 'empty query'
        });
    }

    const {
        username,
        password
    } = query;
    if (!username || !password) {
        return res.status(400).send({
            type: 'missing'
        });
    }

    User.authenticate(username, password, function (err, user) {
        if (err) return next(err);
        else if (user === undefined) {
            res.status(400).send({
                field: 'username'
            });
        } else if (user == null) {
            res.status(400).send({
                field: 'password'
            });
        } else {
            req.session.user_id = user._id;
            res.status(200).send({
                type: 'success'
            });
        }
    });

};

module.exports = new Router('/api/v1/login', {
    'post': post
});