"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationController_1 = require("./NotificationController");
const User = require('../models/user');
const randomID = require("random-id");
const Role = require('../config/rolesEnum');
const Status = require('../config/userStatusEnum');
class CustomerController {
    constructor() {
        this.register = (req, res) => {
            var newUser = new User({
                password: req.body.password,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                status: Status.ACTIVE,
                banReason: "",
                active: false,
                temproraryToken: randomID(6, "0")
            });
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Fail to register user' });
                }
                else {
                    let notificationController = new NotificationController_1.NotificationController();
                    notificationController.sendRegisterNotification(newUser);
                    res.json({ success: true, _id: user._id, msg: 'User registered! Please check your email for activation' });
                }
            });
        };
        this.saveUpdatedProfile = (password, req, res) => {
            var newUser = new User({
                _id: req.body._id,
                password: password,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                role: Role.CUSTOMER
            });
            User.updateCustomer(newUser, (err) => {
                if (err) {
                    res.json({ success: false, msg: 'Fail to update user' });
                }
                else {
                    res.json({ success: true, msg: 'Your profile has been updated' });
                }
            });
        };
        this.getAlCustomers = (req, res) => {
            User.getCustomers((err, users) => {
                if (err) {
                    res.json({ success: false, msg: 'Fail to get users' });
                }
                else {
                    res.json({ success: true, users: users });
                }
            });
        };
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map