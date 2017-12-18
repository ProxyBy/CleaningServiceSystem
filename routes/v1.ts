import {IRoute} from './IRoute';
import {CONTROLLERS} from "./controllers";

let customerController = CONTROLLERS.customer;
let loginController = CONTROLLERS.login;
let companyController = CONTROLLERS.company;
let cleaningTypeController = CONTROLLERS.cleaningType;
let roomTypeController = CONTROLLERS.roomType;
let profileController = CONTROLLERS.profile;
let orderController = CONTROLLERS.order;
let commentController = CONTROLLERS.comment;

export const routesV1: IRoute[] = [
    {
        path: '/register',
        httpMethod: 'POST',
        middleware: [
            customerController.register
        ]
    },
    {
        path: '/profile',
        httpMethod: 'POST',
        middleware: [
            profileController.getProfile
        ]
    },
    {
        path: '/updateUserProfile',
        httpMethod: 'POST',
        middleware: [
            profileController.updateProfile,
            customerController.saveUpdatedProfile
        ]
    },
    {
        path: '/updateCompanyProfile',
        httpMethod: 'POST',
        middleware: [
            profileController.updateProfile,
            companyController.saveUpdatedProfile
        ]
    },
    {
        path: '/registerCompany',
        httpMethod: 'POST',
        middleware: [
            companyController.register
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
            loginController.checkAuthentication,
            customerController.getAlCustomers
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
        path: '/cleaningTypes',
        httpMethod: 'GET',
        middleware: [
            cleaningTypeController.getCleaningTypes
        ]
    },
    {
        path: '/roomTypes',
        httpMethod: 'GET',
        middleware: [
           roomTypeController.getRoomTypes
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
        path: '/companyAvailableList',
        httpMethod: 'GET',
        middleware: [
            loginController.checkAuthentication,
            companyController.getCompanyAvailableList
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
        path: '/profileModeration',
        httpMethod: 'POST',
        middleware: [
            profileController.profileModeration
        ]
    },
    {
        path: '/activateUser',
        httpMethod: 'POST',
        middleware: [
            profileController.activateProfile
        ]
    },
    {
        path: '/deleteUser',
        httpMethod: 'POST',
        middleware: [
            profileController.deleteProfile
        ]
    },
    {
        path: '/order',
        httpMethod: 'POST',
        middleware: [
            orderController.order
        ]
    },
    {
        path: '/getOrders',
        httpMethod: 'POST',
        middleware: [
            orderController.getOrdersForCustomer
        ]
    },
    {
        path: '/getCompanyOrders',
        httpMethod: 'POST',
        middleware: [
            orderController.getOrdersForCompany
        ]
    },
    {
        path: '/addComment',
        httpMethod: 'POST',
        middleware: [
            commentController.addComment
        ]
    },
    {
        path: '/getOrderInfo',
        httpMethod: 'POST',
        middleware: [
            orderController.getOrderInfo
        ]
    }
];
