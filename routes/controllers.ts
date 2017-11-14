import {LoginController} from "../controllers/loginController";
import {UserController} from "../controllers/userController";
import {LoggerController} from "../controllers/loggerController";
import {CompanyController} from "../controllers/companyController";
import {CleaningTypeController} from "../controllers/cleaningTypeController";
import {ServiceOfCompanyController} from "../controllers/serviceOfCompanyController";

export const CONTROLLERS = {
    login: new LoginController(),
    user: new UserController(),
    logger: new LoggerController(),
    company: new CompanyController(),
    cleaningType: new CleaningTypeController(),
    serviceOfCompany: new ServiceOfCompanyController()
};