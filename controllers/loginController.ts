import {Request, Response} from 'express';
import * as util from "util";

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');
const passport = require('passport');
const jwtOptions = require('../config/passportConfig');
const JwtStrategy = require('passport-jwt').Strategy;


export class LoginController {

    constructor() {
        passport.use(new JwtStrategy(jwtOptions, (jwt_payload: any, done: any) => {
            User.findOne({_id: jwt_payload.data._id}, (err: any, user: any) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }));
    }

    public checkAuthentication: Function = (req: Request, res: Response, next: Function) => {
        passport.authenticate('jwt', {session: false}, (err: Error, payload: any) => {
            if (payload) {
                next();
            } else {
                res.json({success: false, msg: 'Wrong JWT token'});
            }
        })(req, res, next)
    };

    private comparePassword: Function = (user: any, password: any, res: Response) => {
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        if (!password) {
            return res.json({success: false, msg: 'Fill you password'});
        }
        const comparePassword = util.promisify(User.comparePassword);
        comparePassword(password, user.password)
            .then(
                (isMatch: any) => {
                    if (isMatch) {
                        const token = jwt.sign({data: user}, config.secret, {
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
                    } else {
                        return res.json({success: false, msg: 'Wrong password'});
                    }
                }
            );
    };

    public auth: Function = (req: Request, res: Response) => {
        const password = req.body.password;
        if (req.body.email) {
            const getUserByEmail = util.promisify(User.getUserByEmail);
            getUserByEmail(req.body.email)
                .then(
                    (user: any) => {
                        this.comparePassword(user, password, res);
                    },
                    (error: any) => {
                        return res.json({success: false, msg: 'Something went wrong'});
                    }
                );
        } else {
            const getUserByPhone = util.promisify(User.getUserByPhone);
            getUserByPhone(req.body.phone)
                .then(
                    (user: any) => {
                        this.comparePassword(user, password, res)
                    },
                    (error: any) => {
                        return res.json({success: false, msg: 'Something went wrong'});
                    }
                );
        }
    };

    public accessControl: Function = (req: Request, res: Response, next: Function) => {
        passport.authenticate('jwt', {session: false}, (err: Error, payload: any) => {
            if (payload && (payload._id == req.body.userId || payload._id == req.body.companyId)) {
                next();
            } else {
                res.json({success: false, msg: "You don't have access"});
            }
        })(req, res, next)
    }
}

