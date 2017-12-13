import {Request, Response} from 'express';

const RoomType = require('../models/roomType');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');

export class OrderController {

    public order: Function = (req: Request, res: Response) => {
       console.log("order!!!!!!!!!!")
    };
}