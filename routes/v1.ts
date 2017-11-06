const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

import {IRoute} from './IRoute';
import {CONTROLLERS} from "./controllers";
let userController = CONTROLLERS.user;
let loginController = CONTROLLERS.login;

export const routesV1: IRoute[] = [
    {
        path: '/register',
        httpMethod: 'POST',
        middleware: [
            userController.register
        ]
    },
    {
        path: '/authenticate',
        httpMethod: 'POST',
        middleware: [
            loginController.login
        ]
    }
];
