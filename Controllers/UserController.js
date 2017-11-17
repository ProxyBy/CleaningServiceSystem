"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');
//const JwtStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: "yousecret" //auth.jwtSecret
};
class UserController {
    constructor() {
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
        this.register = (req, res) => {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                role: "user"
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
        this.getProfile = (req, res) => {
            console.log("getProfile");
            passport.authenticate('jwt', { session: false });
            //   res.json({user: req.user});
            res.json({ message: "Success! You can not see this without a token" });
        };
        this.loginT = (req, res) => {
            console.log("start");
            console.log(req.headers);
            res.send("token test!!");
            console.log("end");
        };
        passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
            console.log("0");
            User.findOne({ id: jwt_payload.sub }, (err, user) => {
                if (err) {
                    console.log("1");
                    return done(err, false);
                }
                if (user) {
                    console.log("2");
                    return done(null, user);
                }
                else {
                    console.log("3");
                    return done(null, false);
                }
            });
        }));
        //       passport.use(new JwtStrategy(jwtOptions, (payload: any, done: Function) => done(null, payload)));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map