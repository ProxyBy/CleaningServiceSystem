import {Request, Response} from 'express';

const User = require('../models/user');
const Role = require('../config/rolesEnum');
const Status = require('../config/userStatusEnum');


export class CompanyController {

    public register: Function = (req: Request, res: Response) => {
        var newCompany = new User({
            logo: req.body.logo,
            username: req.body.name,
            description: req.body.description,
            email: req.body.email,
            password: req.body.password,
            cleaningTypes: req.body.cleaningTypes,
            roomPrices: req.body.roomPrices,
            role: Role.COMPANY,
            status: Status.ACTIVE,
            active: true,  //TODO false and activate
            banReason: ""
        });
        User.addUser(newCompany, (err: any, company: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to register cleaning company'});
            } else {
                res.json({success: true, msg: 'Cleaning company registered'});
            }
        });
    };

    public getAllCompany: Function = (req: Request, res: Response) => {
        User.getCompany((err: any, company: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get cleaning company'});
            } else {
                res.json({success: true, company: company})
            }
        });
    };

    public getCompanyAvailableList: Function = (req: Request, res: Response) => {
        User.getAvailableCompany((err: any, company: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get cleaning company'});
            } else {
                res.json({success: true, company: company})
            }
        });
    };

    public getCompanyParametrizedList: Function = (req: Request, res: Response) => {
        var criteria = {
            cleaningType: JSON.parse(req.body.selectedType)._id,
            roomDescriptions: JSON.parse(req.body.roomDescriptions)
        };

        User.getParametrizedCompany(criteria, (err: any, companies: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get cleaning company'});
            } else {
                var parametrizedCompanies: any[] = [];
                for (let company of companies) {
                    var parametrizedCompany = {
                        _id: company._id,
                        username: company.username,
                        approximatePrice: this.addApproximatePrice(company, criteria)
                    };
                    parametrizedCompanies.push(parametrizedCompany);
                }
                res.json({success: true, company: parametrizedCompanies})
            }
        });
    };

    public addApproximatePrice: Function = (company: any, criteria: any) => {
        let approximatePrice = 0;
        for (let roomPrice of company.roomPrices) {
            for (let roomDescription of criteria.roomDescriptions) {
                if (roomPrice.typeId == roomDescription._id && roomDescription.count != undefined && roomDescription.count > 0) {
                    approximatePrice = (roomPrice.price * roomDescription.count) + approximatePrice;
                    break;
                }
            }
        }
        for (let cleaningType of company.cleaningTypes) {
            if (cleaningType.typeId == criteria.cleaningType) {
                approximatePrice = approximatePrice * cleaningType.coefficient;
            }
        }
        return approximatePrice;
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
            role: Role.COMPANY
        });
        User.updateCompany(newUser, (err: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to update user'});
            } else {
                res.json({success: true, msg: 'Your profile has been updated'});
            }
        });
    };
};