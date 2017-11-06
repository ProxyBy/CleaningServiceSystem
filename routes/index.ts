import {routesV1} from "./v1";
import {Express} from 'express';
import {IRoute} from './IRoute';
import {CONTROLLERS} from "./controllers";

const routes: IRoute[] = [...routesV1];

module.exports = (app: Express) => {
    routes.forEach((route: IRoute) => {
        let args: any[] = [route.path, CONTROLLERS.logger.log].concat(route.middleware);
        switch (route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
        }
    });
};