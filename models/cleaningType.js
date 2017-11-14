const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/bdConfig');

const CleaningTypeSchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
});

const CleaningType = module.exports = mongoose.model('cleaningtype', CleaningTypeSchema);


module.exports.getCleaningType = function(callback){
    CleaningType.find({},{}, callback);
};

module.exports.addType = function(newType, callback){
    newType.save(callback);
};
