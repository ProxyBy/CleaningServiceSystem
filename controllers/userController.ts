import {Request, Response} from 'express';

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');


export class UserController {
    public register: Function = (req: Request, res: Response) => {
        var newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        User.addUser(newUser, (err: any, user: any) => {
            if(err){
                res.json({success: false, msg:'Fail to register user'});
            } else {
                res.json({success: true, msg: 'User registered'})
            }
        });
    };

    public getAllUsers: Function = (req: Request, res: Response) => {
        User.getUsers((err: any, users: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get users'});
            } else {
                res.json({success: true, users: users})
            }
        });
    }
}