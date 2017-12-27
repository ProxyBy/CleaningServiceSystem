const mongoose = require('mongoose');

const RoomTypeSchema = mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String
    }
});

const RoomType = module.exports = mongoose.model('roomtype', RoomTypeSchema);


module.exports.getRoomType = function(callback){
    RoomType.find({},{}, callback);
};

