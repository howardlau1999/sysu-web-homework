const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/users';

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

usersSchema.statics.authenticate = function(username, password, callback) {
    User.findOne({ username }).exec((err, res) => {
        if (err) return callback(err);
        else if (!res) return callback(null, undefined);
        else return callback(null, res.password === password ? res : null);
    })
}

var User = mongoose.model('Users', usersSchema);
module.exports = User;