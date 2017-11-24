const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/bdConfig');

const UsersSchema = mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String,
    },
    role: {
        type: String
    },
    logo: {
        type: String
    },
    description: {
        type: String
    },
    cleaningTypes: [
        {
            typeId: {
                type: Number,
                ref: "cleaningtype"
            },
            coefficient: {
                type: Number
            }
        }],
    roomPrices: [
        {
            typeId: {
                type: Number,
                ref: "roomtype"
            },
            price: {
                type: Number
            }
        }]
});

const User = module.exports = mongoose.model('user', UsersSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getSecuredUserById = function(id, callback){
    User.findById(id,{password: 0}, callback);
};

module.exports.getCustomers = function(callback){
    User.find({role: "Company"},{}, callback);
};

module.exports.updateCustomer = function(newUser, callback){
    User.findByIdAndUpdate(newUser._id, { $set: { username: newUser.username, email: newUser.email, phone: newUser.phone, password: newUser.password, role: newUser.role }}, { new: true },callback);
};

module.exports.updateCompany = function(newUser, callback){
    User.findByIdAndUpdate(newUser._id, { $set: {
        username: newUser.username,
        description: newUser.description,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        cleaningTypes: newUser.cleaningTypes,
        roomPrices: newUser.roomPrices
    }}, { new: true },callback);
};

module.exports.getUserByEmail = function(email, callback){
    const query = {email: email}
    User.findOne(query, callback);
};

module.exports.getUserByPhone = function(phone, callback){
    const query = {phone: phone}
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

module.exports.encryptPassword = function(password){
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject(err);
                resolve(hash);
            });
        });
    });
};

module.exports.comparePassword = function(condidatePassword, hash, callback) {
    bcrypt.compare(condidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getCompany = function(callback){
    User.find({},{}, callback);
};

module.exports.getParametrizedCompany = function(criteria, callback){
    User.find({'cleaningType.typeId': criteria.cleaningType}).populate('cleaningType', { name: 1, _id: 0}).exec(callback);
};