"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');
class LoginController {
    constructor() {
        /*  public callback: Function = (err: any, user: any) => {
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
                              email: user.email,
                              role: user.role
                          }
                      });
                  } else {
                      return res.json({success: false, msg: 'Wrong password'});
                  }
              });
          };*/
        // TODO вынести колбэк
        this.auth = (req, res) => {
            const password = req.body.password;
            if (req.body.email) {
                User.getUserByEmail(req.body.email, (err, user) => {
                    if (err)
                        throw err;
                    if (!user) {
                        return res.json({ success: false, msg: 'User not found' });
                    }
                    User.comparePassword(password, user.password, (err, isMatch) => {
                        if (err)
                            throw err;
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
                });
            }
            else {
                User.getUserByPhone(req.body.phone, (err, user) => {
                    if (err)
                        throw err;
                    if (!user) {
                        return res.json({ success: false, msg: 'User not found' });
                    }
                    User.comparePassword(password, user.password, (err, isMatch) => {
                        if (err)
                            throw err;
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
                });
            }
        };
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=loginController.js.map