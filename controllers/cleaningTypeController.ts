import {Request, Response} from 'express';

const CleaningType = require('../models/cleaningType');

export class CleaningTypeController {

    public getCleaningTypes: Function = (req: Request, res: Response) => {
        CleaningType.getCleaningType((err: any, cleaningType: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to get cleaning types'});
            } else {
                res.json({success: true, types: cleaningType})
            }
        });
    };

    public addCleaningType: Function = (req: Request, res: Response) => {
        var newType = new CleaningType({
            id: req.body.id,
            name: req.body.name
        });

        CleaningType.addType(newType, (err: any) => {
            if (err) {
                res.json({success: false, msg: 'Fail to add cleaning type'});
            } else {
                res.json({success: true, msg: 'Cleaning type registered'})
            }
        });
    };
}