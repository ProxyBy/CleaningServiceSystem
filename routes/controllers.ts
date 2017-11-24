import {LoginController} from "../controllers/loginController";
import {CustomerController} from "../controllers/customerController";
import {LoggerController} from "../controllers/loggerController";
import {CompanyController} from "../controllers/companyController";
import {CleaningTypeController} from "../controllers/cleaningTypeController";
import {RoomTypeController} from "../controllers/roomTypeController";
import {ProfileController} from "../controllers/profileController";

export const CONTROLLERS = {
    login: new LoginController(),
    customer: new CustomerController(),
    logger: new LoggerController(),
    company: new CompanyController(),
    cleaningType: new CleaningTypeController(),
    roomType: new RoomTypeController(),
    profile: new ProfileController()
};