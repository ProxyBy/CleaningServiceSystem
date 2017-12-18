const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/bdConfig');
const Role = require('../config/rolesEnum');
const Status = require('../config/userStatusEnum');

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
        }],
    status: {
        type: String
    },
    banReason: {
        type: String
    },
    active: {
        type: Boolean
    },
    temproraryToken: {
        type: String
    }
});

const User = module.exports = mongoose.model('user', UsersSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUser = function (newUser, callback) {
    User.findOne({_id: newUser._id, active: "true"}, {}, callback);
};


module.exports.getSecuredUserById = function (id, callback) {
    User.findById(id, {password: 0, status: 0, banReason: 0}, callback);
};

module.exports.getCustomers = function (callback) {
    User.find({role: Role.CUSTOMER}, {}, callback);
};

module.exports.getCompany = function (callback) {
    User.find({role: Role.COMPANY}, {password: 0}, callback);
};

module.exports.getAvailableCompany = function (callback) {
    User.find({role: Role.COMPANY, status: Status.ACTIVE, active: true}, {password: 0}, callback);
};

module.exports.updateCustomer = function (newUser, callback) {
    User.findByIdAndUpdate(newUser._id, {
        $set: {
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            password: newUser.password,
            role: newUser.role
        }
    }, {new: true}, callback);
};

module.exports.updateCompany = function (newUser, callback) {
    User.findByIdAndUpdate(newUser._id, {
        $set: {
            username: newUser.username,
            description: newUser.description,
            email: newUser.email,
            password: newUser.password,
            role: Role.COMPANY,
            cleaningTypes: newUser.cleaningTypes,
            roomPrices: newUser.roomPrices
        }
    }, {new: true}, callback);
};

module.exports.userModeration = function (user, callback) {
    User.findByIdAndUpdate(user._id, {
        $set: {
            status: user.status,
            banReason: user.banReason
        }
    }, {new: false}, callback);
};

module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email, status: Status.ACTIVE};
    User.findOne(query, callback);
};

module.exports.getUserByPhone = function (phone, callback) {
    const query = {phone: phone, status: Status.ACTIVE};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.encryptPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
};

module.exports.comparePassword = function (condidatePassword, hash, callback) {
    bcrypt.compare(condidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getParametrizedCompany = function (criteria, callback) {
    User.find({
        'cleaningTypes.typeId': criteria.cleaningType,
        'status': Status.ACTIVE,
        'active': true,
        'role': Role.COMPANY
    }, {password: 0}).populate('cleaningType', {username: 1, _id: 0}).exec(callback);
};

module.exports.activateUser = function (newUser, callback) {
    User.update({_id: newUser._id, temproraryToken: newUser.temproraryToken}, {$set: {active: 'true'}}, callback);
};

module.exports.deleteUser = function (newUser, callback) {
    User.remove({_id: newUser._id}, callback);
};
