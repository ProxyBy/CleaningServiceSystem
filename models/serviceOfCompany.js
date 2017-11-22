//TODO Delete class
const mongoose = require('mongoose');

const ServiceOfCompanySchema = mongoose.Schema({
    companyKey: {
        type: String
    },
    serviceTypeId: {
        type: String
    }
});

const ServiceOfCompany = module.exports = mongoose.model('serviceofcompany', ServiceOfCompanySchema);


module.exports.getServiceOfCompany = function(callback){
    ServiceOfCompany.find({},{}, callback);
};

module.exports.addServiceOfCompany = function(newServiceOfCompany){
    newServiceOfCompany.save();
};
