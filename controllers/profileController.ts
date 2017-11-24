import {Request, Response} from 'express';

const express = require('express');
const User = require('../models/user');

export class ProfileController {
    public getProfile: Function = (req: Request, res: Response) => {
        User.getSecuredUserById(req.body._id, (err: any, user: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get user'});
            } else {
                res.json({success: true, user: user})
            }
        });
    };

    public updateProfile: Function = (req: Request, res: Response, next: Function) => {
        console.log(req.body._id);
        User.getUserById(req.body._id, (err: any, user: any) => {
            if(err){
                res.json({success: false, msg:'Fail to update user'});
            } else {
                User.comparePassword(req.body.oldPassword, user.password, (err: any, isMatch: boolean) => {
                    if(err) throw err;
                    if(isMatch){
                        let password: any;
                        if (req.body.password) {
                            User.encryptPassword(req.body.password)
                                .then(
                                    (result: any) => {
                                        req.body.password = result;
                                        next();
                                        //this.saveUpdatedProfile(result, req, res);
                                    },
                                    (error: any) => {
                                        return res.json({success: false, msg: 'Fail to update user'});
                                    }
                                );
                        } else {
                            req.body.password = user.password;
                            next();
                           // this.saveUpdatedProfile(password, req, res)
                        }
                    } else {
                        return res.json({success: true, msg: 'Wrong old password'});
                    }
                });
            }
        });
    };
}