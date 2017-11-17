const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/bdConfig');

const CompanySchema = mongoose.Schema({
    logo: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requered: true
    },
    cleaningType: [{
        type: Number,
        ref: "cleaningtype"
    }]
});

const Company = module.exports = mongoose.model('company', CompanySchema);

module.exports.addCompany = function(newCompany, callback){

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCompany.password, salt, (err, hash) => {
            if(err) throw err;
            newCompany.password = hash;
            newCompany.save(callback);
        });
    });
};

module.exports.getCompany = function(callback){
    Company.find({},{}, callback);
};

module.exports.getParametrizedCompany = function(criteria, callback){
    Company.find({cleaningType: criteria.cleaningType}).populate('cleaningType', { name: 1, _id: 0}).exec(callback);
};