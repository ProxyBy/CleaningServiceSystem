"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');
const passport = require('passport');
const jwtOptions = require('../config/passportConfig');
const JwtStrategy = require('passport-jwt').Strategy;
class LoginController {
    constructor() {
        this.checkAuthentication = (req, res, next) => {
            passport.authenticate('jwt', { session: false }, (err, payload) => {
                if (payload) {
                    next();
                }
                else {
                    res.json({ success: false, msg: 'Wrong JWT token' });
                }
            })(req, res, next);
        };
        this.comparePassword = (user, password, res) => {
            if (!user) {
                return res.json({ success: false, msg: 'User not found' });
            }
            if (!password) {
                return res.json({ success: false, msg: 'Fill you password' });
            }
            const comparePassword = util.promisify(User.comparePassword);
            comparePassword(password, user.password)
                .then((isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ data: user }, config.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            username: user.username,
                            role: user.role
                        },
                        msg: "Hello " + user.username + " (" + user.role + ")"
                    });
                }
                else {
                    return res.json({ success: false, msg: 'Wrong password' });
                }
            });
        };
        this.auth = (req, res) => {
            const password = req.body.password;
            if (req.body.email) {
                const getUserByEmail = util.promisify(User.getUserByEmail);
                getUserByEmail(req.body.email)
                    .then((user) => {
                    this.comparePassword(user, password, res);
                }, (error) => {
                    return res.json({ success: false, msg: 'Something went wrong' });
                });
            }
            else {
                const getUserByPhone = util.promisify(User.getUserByPhone);
                getUserByPhone(req.body.phone)
                    .then((user) => {
                    this.comparePassword(user, password, res);
                }, (error) => {
                    return res.json({ success: false, msg: 'Something went wrong' });
                });
            }
        };
        this.accessControl = (req, res, next) => {
            passport.authenticate('jwt', { session: false }, (err, payload) => {
                if (payload && (payload._id == req.body.userId || payload._id == req.body.companyId)) {
                    next();
                }
                else {
                    res.json({ success: false, msg: "You don't have access" });
                }
            })(req, res, next);
        };
        passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
            User.findOne({ _id: jwt_payload.data._id }, (err, user) => {
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
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=loginController.js.map