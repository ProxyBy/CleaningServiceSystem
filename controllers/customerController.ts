import {Request, Response} from 'express';
import {NotificationController} from './NotificationController';

const User = require('../models/user');
const randomID = require("random-id");
const Role = require('../config/rolesEnum');
const Status = require('../config/userStatusEnum');

export class CustomerController {

    public register: Function = (req: Request, res: Response) => {
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
        User.addUser(newUser, (err: any, user: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to register user'});
            } else {
                let notificationController = new NotificationController();
                notificationController.sendRegisterNotification(newUser);
                res.json({success: true, _id: user._id, msg: 'User registered! Please check your email for activation'})
            }
        });
    };

    public saveUpdatedProfile: Function = (password: any, req: Request, res: Response) => {
        var newUser = new User({
            _id: req.body._id,
            password: password,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            role: Role.CUSTOMER
        });
        User.updateCustomer(newUser, (err: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to update user'});
            } else {
                res.json({success: true, msg: 'Your profile has been updated'});
            }
        });
    };

    public getAlCustomers: Function = (req: Request, res: Response) => {
        User.getCustomers((err: any, users: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get users'});
            } else {
                res.json({success: true, users: users})
            }
        });
    };
}