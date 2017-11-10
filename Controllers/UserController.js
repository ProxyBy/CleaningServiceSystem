"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');
class UserController {
    constructor() {
        this.register = (req, res) => {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Fail to register user' });
                }
                else {
                    res.json({ success: true, msg: 'User registered' });
                }
            });
        };
        this.getAllUsers = (req, res) => {
            User.getUsers((err, users) => {
                if (err) {
                    res.json({ success: false, msg: 'Fail to register user' });
                }
                else {
                    res.json({ success: true, users: users });
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map