import {IRoute} from './IRoute';
import {CONTROLLERS} from "./controllers";

let userController = CONTROLLERS.user;
let loginController = CONTROLLERS.login;
let companyController = CONTROLLERS.company;
let cleaningTypeController = CONTROLLERS.cleaningType;
let serviceOfCompanyController = CONTROLLERS.serviceOfCompany;

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
            loginController.auth
        ]
    },
    {
        path: '/users',
        httpMethod: 'GET',
        middleware: [
            userController.getAllUsers
        ]
    },
    {
        path: '/company',
        httpMethod: 'GET',
        middleware: [
            companyController.getAllCompany
        ]
    },
    {
        path: '/registerCompany',
        httpMethod: 'POST',
        middleware: [
            companyController.register
           // serviceOfCompanyController.addServicesOfCompany
        ]
    },
    {
        path: '/cleaningTypes',
        httpMethod: 'GET',
        middleware: [
            cleaningTypeController.getCleaningTypes
        ]
    },
    {
        path: '/addCleaningType',
        httpMethod: 'POST',
        middleware: [
            cleaningTypeController.addCleaningType
        ]
    },
    {
        path: '/companyParametrizedList',
        httpMethod: 'POST',
        middleware: [
            companyController.getCompanyParametrizedList
        ]
    },
    {
        path: '/a',
        httpMethod: 'GET',
        middleware: [
            userController.checkAuthentication
           // userController.auth,
          //  userController.getProfile
        ]
    }

];
