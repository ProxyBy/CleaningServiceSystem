"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationController_1 = require("./NotificationController");
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');
//const JwtStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;
var randomID = require("random-id");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: "yousecret" //auth.jwtSecret
};
class CustomerController {
    constructor() {
        this.register = (req, res) => {
            var newUser = new User({
                password: req.body.password,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                status: "active",
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
                    res.json({ success: true, msg: 'User registered! Please check your email for activation' });
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
                role: req.body.role
            });
            User.updateCustomer(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, msg: 'Fail to update user' });
                }
                else {
                    res.json({ success: true, msg: 'Your profile has been updated' });
                }
            });
        };
        this.checkAuthentication = (req, res, next) => {
            console.log('Token got with request:');
            console.log(req.header('Authorization'));
            passport.authenticate('jwt', { session: false }, (err, payload) => {
                console.log('Checking JWT');
                console.log('Payload:');
                console.log(payload);
                /* if (payload) {
                     this.userService.addUserToPayload(payload).then((payload: any) => {
                         req.payload = payload;
                         next()
                     });
                 } else {
                     console.log(err);
                     console.log('Wrong JWT token');
                     ResponseService.unAuthorizedUser(res);
                 }*/
            })(req, res, next);
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
        /*    public getProfile: Function = (req: Request, res: Response) => {
                console.log("getProfile");
                user = passport.authenticate('jwt', {session: false});
                res.json({user: req.user});
            };*/
        this.loginT = (req, res) => {
            console.log("start");
            console.log(req.headers);
            res.send("token test!!");
            console.log("end");
        };
        passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
            User.findOne({ id: jwt_payload.sub }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
        }));
        //       passport.use(new JwtStrategy(jwtOptions, (payload: any, done: Function) => done(null, payload)));
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map