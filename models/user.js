const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/bdConfig');

const UsersSchema = mongoose.Schema({
    name: {
       type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        requered: true
    },
    password: {
        type: String,
        requered: true
    },
    role: {
        type: String
    }
});

const User = module.exports = mongoose.model('user', UsersSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUsers = function(callback){
    User.find({},{}, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(condidatePassword, hash, callback) {
    bcrypt.compare(condidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};