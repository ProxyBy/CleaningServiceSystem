import {Request, Response} from 'express';

const RoomType = require('../models/roomType');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');

export class RoomTypeController {

    public getRoomTypes: Function = (req: Request, res: Response) => {
        RoomType.getRoomType((err: any, roomType: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get room types'});
            } else {
                res.json({success: true, types: roomType})
            }
        });
    };
}