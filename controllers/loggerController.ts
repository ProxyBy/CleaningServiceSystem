import {Request, Response} from 'express';

export class LoggerController {
    public log: Function = (req: Request, res: Response, next: Function) => {

        if (req.query) {
            console.log("Query:");
            console.log(req.query);
        }
        if (req.body) {
            console.log("Body:");
            console.log(req.body);
        }
        next();
    };
}