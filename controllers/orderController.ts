import {Request, Response} from 'express';
import {NotificationController} from "./notificationController";
import {DateUtills} from "../services/dateUtills";

const Order = require('../models/order');
const Status = require('../config/orderStatusEnum');

export class OrderController {

    public order: Function =  (req: Request, res: Response) => {
        let dateUtills = new DateUtills();
        var order = new Order({
               cleaningTypeId: req.body.cleaningTypeId,
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
               status: Status.NEW,
               dates: dateUtills.getDatesFromDays(req.body.selectedDays, req.body.regularity, req.body.dueDate),
               dueDate: req.body.dueDate,
               time: req.body.time,

        });
           Order.addOrder(order, (err: any) => {
               if (err) {
                   res.json({success: false, msg: 'Something went wrong'});
               } else {
                   res.json({success: true, msg: 'Order was added'});
               }
           });
    };


    public getOrdersForCustomer: Function = (req: Request, res: Response) => {
        Order.getUserOrders(req.body.userId, (err: any, orders: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get orders'});
            } else {
                res.json({success: true, orders: orders})
            }
        });
    };


    public getOrdersForCompany: Function = (req: Request, res: Response) => {
        Order.getCompanyOrders(req.body.companyId, (err: any, orders: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get orders'});
            } else {
                res.json({success: true, orders: orders})
            }
        });
    };

    public getOrderInfo: Function = (req: Request, res: Response) => {
        Order.getOrder(req.body.orderId, (err: any, order: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get order'});
            } else {
                res.json({success: true, order: order})
            }
        });
    };

    public updateOrder: Function = (req: Request, res: Response) => {
        var newOrder = new Order({
            _id: req.body.orderId,
            companyId: req.body.companyId,
            status: req.body.status,
            rejectReason: req.body.rejectReason,
            email: req.body.email
        });
        Order.updateOrderStatus(newOrder, (err: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to update order'});
            } else {
                let notificationController = new NotificationController();
                notificationController.sendOrderNotification(newOrder);
                res.json({success: true, msg: 'Order status has been updated'});
            }
        });

    };
}