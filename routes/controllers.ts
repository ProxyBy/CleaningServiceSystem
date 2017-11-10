import {LoginController} from "../controllers/loginController";
import {UserController} from "../controllers/userController";
import {LoggerController} from "../controllers/loggerController";

export const CONTROLLERS = {
    login: new LoginController(),
    user: new UserController(),
    logger: new LoggerController()
};