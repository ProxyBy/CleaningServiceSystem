import {Request, Response} from 'express';
import {DateUtills} from "../services/dateUtills";
import * as util from "util";

const User = require('../models/user');
const Order = require('../models/order');
const Role = require('../config/rolesEnum');
const Status = require('../config/userStatusEnum');


export class CompanyController {

    public register: Function = (req: Request, res: Response) => {
        var newCompany = new User({
            logo: req.body.logo,
            username: req.body.name,
            description: req.body.description,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
            cleaningTypes: req.body.cleaningTypes,
            roomPrices: req.body.roomPrices,
            role: Role.COMPANY,
            status: Status.ACTIVE,
            active: true,  //TODO false and activate
            banReason: ""
        });
        User.addUser(newCompany, (err: any) => {
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
        let dateUtills = new DateUtills();
        let companyParametrizedList: any[] = [];
        var criteria = {
            cleaningType: JSON.parse(req.body.selectedType)._id,
            roomDescriptions: JSON.parse(req.body.roomDescriptions),
            dates: dateUtills.getDatesFromDays(req.body.selectedDays, req.body.regularity, req.body.dueDate),

        };
        User.getParametrizedCompany(criteria, async (err: any, companies: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get cleaning company'});
            } else {
                var parametrizedCompanies: any[] = [];
                for (let company of companies) {
                    var parametrizedCompany = {
                        _id: company._id,
                        username: company.username,
                        logo: company.logo,
                        address: company.address,
                        approximatePrice: this.countPrice(company, criteria)
                    };
                    parametrizedCompanies.push(parametrizedCompany);
                }
                for (let company of parametrizedCompanies) {
                    console.log(company);
                    await Order.getCompanyOrdersByDates(company._id, criteria.dates)
                        .then(
                            (result: any) => {
                                if (result.length == 0){
                                    console.log(result.length);
                                    console.log("add");
                                    console.log(result);
                                    companyParametrizedList.push(company);
                                }
                            },
                            (error: any) => {
                                console.log("fail");
                                return res.json({success: false, msg: 'Fail to update user'});
                            }
                        );
                }
                res.json({success: true, company: companyParametrizedList});
            }
        });
    };

    public countPrice: Function = (company: any, criteria: any) => {
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

    public getPrice: Function = (req: Request, res: Response) => {
        var criteria = {
            cleaningType: JSON.parse(req.body.selectedType),
            roomDescriptions: JSON.parse(req.body.roomDescriptions)
        };
        User.getSecuredUserById(req.body.companyId, (err: any, company: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get user'});
            } else {
                res.json({success: true, price: this.countPrice(company, criteria)});
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