const Status = require('../config/orderStatusEnum');
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
    },
    rejectReason: {
        type: String
    },
    dates: {
        type: String
    },
    time: {
        type: String
    },
    dueDate: {
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

module.exports.getCompanyOrdersByDates = function(companyId, dates){
    console.log(dates);
 return new Promise((resolve, reject) => {
     resolve(Order.find({companyId: companyId, dates: dates},{}));
 });
};


/*
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
*/


module.exports.getOrder = function(orderId, callback){
    Order.findById(orderId,{}, callback);
};

module.exports.addOrder = function(order, callback){
    order.save(callback);
};

module.exports.updateOrderStatus = function (newOrder, callback) {
    Order.findByIdAndUpdate(newOrder._id, {
        $set: {
            companyId: newOrder.companyId,
            status: newOrder.status,
            rejectReason: newOrder.rejectReason
        }
    }, {new: false}, callback);
};

/*module.exports.getOrdersByDatesAndCompany = function (dates, callback) {
    Order.find({
   //     'dates': dates
  //      'status': Status.APPROVED
    }, {}).populate('user', {}).exec(callback);

};*/



