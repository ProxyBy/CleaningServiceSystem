import {Request, Response} from 'express';
import {text} from "body-parser";

const Comment = require('../models/comment');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/bdConfig');

export class CommentController {

    public addComment: Function = (req: Request, res: Response) => {
        var newComment = new Comment({
            authorId: req.body.authorId,
            companyId: req.body.companyId,
            rating: req.body.rating,
            text: req.body.text
        });

        Comment.addNewComment(newComment, (err: any) => {
            if(err){
                res.json({success: false, msg:'Fail to add comment'});
            } else {
                res.json({success: true, msg: 'Comment was added'})
            }
        });
    };

    public getRaiting: Function = (req: Request, res: Response) => {
        Comment.getCompanyRating(req.body.companyId, (err: any, ratingList: any) => {
            if(err){
                res.json({success: false, msg:'Fail to get rating'});
            } else {
                let overallRating = this.countRating(ratingList);
                res.json({success: true, rating: overallRating})
            }
        });
    };

    public countRating: Function = (ratingList: any) => {
        let overallRating = 0;
        for (let rating of ratingList){
            overallRating = overallRating + rating ;
        }
        return overallRating/ratingList.size;
    };
}