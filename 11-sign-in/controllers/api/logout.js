
const Router = require('../../server/urls');
module.exports = new Router('/api/v1/logout', {
    "get": function (req, res, next) {
        if (req.session) {
            req.session.destroy(function(err) {
                if (err) return next(err);
                else res.redirect('/');
            });
        }
    }
});