import {Request, Response} from 'express';

const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');


export class LoginController {

    public login: Function = (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;

        User.getUserByUsername(username, (err: any, user: any) => {
            if(err) throw err;
            if(!user){
                return res.json({success: false, msg: 'User not found'});
            }
            User.comparePassword(password, user.password, (err: any, isMatch: boolean) => {
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign({data:user}, config.secret, {
                        expiresIn: 604800 // 1 week
                    });

                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    return res.json({success: false, msg: 'Wrong password'});
                }
            });
        });
    }
}

