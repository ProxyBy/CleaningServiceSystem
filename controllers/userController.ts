import {Request, Response} from 'express';

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
    secretOrKey: "yousecret"//auth.jwtSecret
};

export class UserController {
    constructor(){

        passport.use(new JwtStrategy(jwtOptions, (jwt_payload: any, done: any) => {
            console.log("0");
            User.findOne({id: jwt_payload.sub}, (err: any, user: any) => {
                if(err){
                    console.log("1");
                    return done(err, false);
                }
                if(user){
                    console.log("2");
                    return done(null, user);
                } else {
                    console.log("3");
                    return done(null, false);
                }
            });
        }));

 //       passport.use(new JwtStrategy(jwtOptions, (payload: any, done: Function) => done(null, payload)));
    }



    public checkAuthentication: Function =
        (req: Request, res: Response, next: Function) => {

            console.log('Token got with request:');
            console.log(req.header('Authorization'));

            passport.authenticate('jwt', {session: false}, (err: Error, payload: any) => {

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
            })(req, res, next)
        };

    public register: Function = (req: Request, res: Response) => {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            role: "user"
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
    };


/*    public getProfile: Function = (req: Request, res: Response) => {
        console.log("getProfile");
        user = passport.authenticate('jwt', {session: false});
        res.json({user: req.user});
    };*/

    public getProfile: Function = (req: Request, res: Response) => {
        console.log("getProfile");
        passport.authenticate('jwt', {session: false});
     //   res.json({user: req.user});
        res.json({message: "Success! You can not see this without a token"});
    };





    public loginT: Function = (req: Request, res: Response) => {
        console.log("start");
        console.log(req.headers);
        res.send("token test!!");
        console.log("end");
    }
        /*passport.authenticate('jwt', {session: false}, (err: Error, payload: any, info: any) => {
            console.log('Payload:');
            console.log(payload);
            if (payload) {
                console.log('yes');
               /!* this.userService.addUserToPayload(payload).then((payload: any) => {
                    const token = this.loginService.generateToken(payload);
                    let time = this.loginService.getTokenExpirationTime(token);
                    console.log('New JWT token sent to client:');
                    console.log('JWT ' + token);
                    ResponseService.success(res, {token: 'JWT ' + token, expirationDate: time});
                });*!/
            } else {
                console.log("no");
                /!*return ResponseService.wrongVendorToken(res);*!/
            }
        })(req, res);*/

    /*public checkAuthentication: Function =
        (req: Request, res: Response, next: Function) => {

            console.log('Token got with request:');
            console.log(req.header('Authorization'));

            passport.authenticate('jwt', {session: false}, (err: Error, payload: any) => {

                console.log('Checking JWT');
                console.log('Payload:');
                console.log(payload);

                if (payload) {
                    this.userService.addUserToPayload(payload).then((payload: any) => {
                        req.payload = payload;
                        next()
                    });
                } else {
                    console.log(err);
                    console.log('Wrong JWT token');
                    ResponseService.unAuthorizedUser(res);
                }
            })(req, res, next)
        };
*/


}