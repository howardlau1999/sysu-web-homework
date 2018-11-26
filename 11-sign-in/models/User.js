const mongoose = require('mongoose'),
    bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    stuid: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

usersSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({
        username
    }).exec((err, res) => {
        if (err) return callback(err);
        else if (!res) return callback(null, undefined);
        else {
            const password_correct = bcrypt.compareSync(password, res.password);
            return callback(null, password_correct ? res : null);
        }
    })
}

var User = mongoose.model('Users', usersSchema);
module.exports = User;