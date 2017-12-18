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
    Order.find({customerId: userId},{}, callback);
};

module.exports.getCompanyOrders = function(companyId, callback){
    Order.find({companyId: companyId},{}, callback);
};

module.exports.getOrder = function(orderId, callback){
    Order.findById(orderId,{}, callback);
};

module.exports.addOrder = function(order, callback){
    order.save(callback);
};

