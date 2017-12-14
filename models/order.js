const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    cleaningTypeId: {
        type: Number
    },
    cleaningTypeName: {
        type: String
    },
    roomDescriptions: {
        type: String
    },
    address: {
        type: String
    },
    days: {
        type: String
    },
    regularity: {
        type: String
    },
    email: {
        type: String
    },
    companyId: {
        type: String
    },
    companyName: {
        type: String
    },
    customerId: {
        type: String
    },
    price: {
        type: String
    },
    status: {
        type: String
    }
});

const Order = module.exports = mongoose.model('order', OrderSchema);


module.exports.getUserOrders = function(userId, callback){
    console.log(userId);
    Order.find({customerId: userId},{}, callback);
};

module.exports.addOrder = function(order, callback){
    order.save(callback);
};

