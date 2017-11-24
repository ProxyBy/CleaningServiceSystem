import {Request, Response} from 'express';

const User = require('../models/user');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');

export class CompanyController {
    public register: Function = (req: Request, res: Response, next: Function) => {
        var newCompany = new User({
            logo: req.body.logo,
            username: req.body.name,
            description: req.body.description,
            email: req.body.email,
            password: req.body.password,
            cleaningTypes: req.body.cleaningTypes,
            roomPrices: req.body.roomPrices,
            role: req.body.role
        });
        User.addUser(newCompany, (err: any, company: any) => {
            if(err){
                res.json({success: false, msg:'Fail to register cleaning company'});
            } else {
                res.json({success: true, msg: 'Cleaning company registered'});
            }
        });

    };

    public getAllCompany: Function = (req: Request, res: Response) => {
        User.getCompany((err: any, company: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get cleaning company'});
            } else {
                res.json({success: true, company: company})
            }
        });
    };

    public getCompanyParametrizedList: Function = (req: Request, res: Response) => {
        var criteria = {
            cleaningType: req.body.selectedType
        };
        User.getParametrizedCompany(criteria, (err: any, company: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get cleaning company'});
            } else {
                console.log(company.toString());
                res.json({success: true, company: company})
            }
        });
    };

    public saveUpdatedProfile: Function = (req: Request, res: Response) => {
        var newUser = new User({
            _id: req.body._id,
            logo: req.body.logo,
            username: req.body.username,
            description: req.body.description,
            email: req.body.email,
            password: req.body.password,
            cleaningTypes: req.body.cleaningTypes,
            roomPrices: req.body.roomPrices,
            role: req.body.role
        });
        User.updateCompany(newUser, (err: any, user: any) => {
            if(err){
                res.json({success: false, msg:'Fail to update user'});
            } else {
                res.json({success: true, msg:'Your profile has been updated'});
            }
        });
    };
};