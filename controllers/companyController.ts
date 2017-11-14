import {Request, Response} from 'express';

const Company = require('../models/company');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');

export class CompanyController {
    public register: Function = (req: Request, res: Response, next: Function) => {
        var newCompany = new Company({
            logo: req.body.logo,
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            password: req.body.password
        });

        Company.addCompany(newCompany, (err: any, company: any) => {
            if(err){
                res.json({success: false, msg:'Fail to register cleaning company'});
            } else {
                res.json({success: true, msg: 'Cleaning company registered'});
                console.log("ready");
                next()
            }
        });

    };

    public getAllCompany: Function = (req: Request, res: Response) => {
        Company.getCompany((err: any, company: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get cleaning company'});
            } else {
                res.json({success: true, company: company})
            }
        });
    }
};