import {LoginController} from "../controllers/LoginController";
import {UserController} from "../controllers/UserController";

export const CONTROLLERS = {
    login: new LoginController(),
    user: new UserController()
};