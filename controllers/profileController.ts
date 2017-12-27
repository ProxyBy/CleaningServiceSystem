import {Request, Response} from 'express';
import {NotificationController} from './NotificationController';

const User = require('../models/user');

export class ProfileController {

    public getProfile: Function = (req: Request, res: Response) => {
        User.getSecuredUserById(req.body._id, (err: any, user: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get user'});
            } else {
                res.json({success: true, user: user})
            }
        });
    };

    public updateProfile: Function = (req: Request, res: Response, next: Function) => {
        User.getUserById(req.body._id, (err: any, user: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to update user'});
            } else {
                User.comparePassword(req.body.oldPassword, user.password, (err: any, isMatch: boolean) => {
                    if (err) throw err;
                    if (isMatch) {
                        if (req.body.password) {
                            User.encryptPassword(req.body.password)
                                .then(
                                    (result: any) => {
                                        req.body.password = result;
                                        next();
                                    },
                                    (error: any) => {
                                        return res.json({success: false, msg: 'Fail to update user'});
                                    }
                                );
                        } else {
                            req.body.password = user.password;
                            next();
                        }
                    } else {
                        return res.json({success: true, msg: 'Wrong old password'});
                    }
                });
            }
        });
    };

    public profileModeration: Function = (req: Request, res: Response) => {
        var newUser = new User({
            _id: req.body._id,
            status: req.body.status,
            banReason: req.body.banReason,
            email: req.body.email
        });
        User.userModeration(newUser, (err: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to update user'});
            } else {
                let notificationController = new NotificationController();
                notificationController.sendModerationNotification(newUser);
                res.json({success: true, msg: 'Status has been updated'});
            }
        });
    };

    public activateProfile: Function = (req: Request, res: Response) => {
        var newUser = new User({
            _id: req.body._id,
            temproraryToken: req.body.temproraryToken
        });
        User.activateUser(newUser, (err: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to activate user'});
            } else {
                User.getUser(newUser, (err: any, user: any) => {
                    if (err) {
                        res.json({success: false, msg: 'Fail to activate user'});
                    } else {
                        if (user != null) {
                            res.json({
                                success: true,
                                active: user.active
                            });
                        } else {
                            res.json({
                                success: true
                            });
                        }
                    }
                });
            }
        });
    };

    public deleteProfile: Function = (req: Request, res: Response) => {
        var newUser = new User({
            _id: req.body._id,
            email: req.body.email
        });
        let notificationController = new NotificationController();
        notificationController.sendDeleteNotification(newUser);
        User.deleteUser(newUser, (err: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to delete user'});
            } else {
                res.json({success: true, msg: 'User was deleted'});
            }
        });
    };

}