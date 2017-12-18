import {Request, Response} from 'express';

const RoomType = require('../models/roomType');

export class RoomTypeController {

    public getRoomTypes: Function = (req: Request, res: Response) => {
        RoomType.getRoomType((err: any, roomType: any) => {
            if(err){
                res.json({success: false, msg: 'Fail to get room types'});
            } else {
                res.json({success: true, types: roomType})
            }
        });
    };
}