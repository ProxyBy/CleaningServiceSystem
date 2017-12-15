import {Request, Response} from 'express';

const RoomType = require('../models/roomType');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');
const Order = require('../models/order');

export class OrderController {

    public order: Function = (req: Request, res: Response) => {
        var order = new Order({
            leaningTypeId: req.body.leaningTypeId,
            cleaningTypeName: req.body.cleaningTypeName,
            roomDescriptions: req.body.roomDescriptions,
            address: req.body.address,
            days: req.body.selectedDays,
            regularity: req.body.regularity,
            email: req.body.email,
            companyId: req.body.companyId,
            companyName: req.body.companyName,
            customerId: req.body.customerId,
            price: req.body.price,
            status: "new"
        });
        Order.addOrder(order, (err: any) => {
            if(err){
                res.json({success: false, msg:'Somthing went wrong'});
            } else {
                res.json({success: true, msg:'Order was added'});
            }
        });
    };

    public getOrdersForCustomer: Function = (req: Request, res: Response) => {
        Order.getUserOrders(req.body.userId, (err: any, orders: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get orders'});
            } else {
                res.json({success: true, orders: orders})
            }
        });
    };


    public getOrdersForCompany: Function = (req: Request, res: Response) => {
        Order.getCompanyOrders(req.body.companyId, (err: any, orders: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get orders'});
            } else {
                res.json({success: true, orders: orders})
            }
        });
    };

    public getOrderInfo: Function = (req: Request, res: Response) => {
        Order.getOrder(req.body.orderId, (err: any, order: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get order'});
            } else {
                res.json({success: true, order: order})
            }
        });
    };
}