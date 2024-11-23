import { Router } from "express";
import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";
import AuthMiddleware from "./Infrastructure/middlewares/auth.middleware";

const routes = Router();

//#region Auth
const authController = new AuthController();
routes.post("/signin", (req, res, next) => authController.signIn(req, res, next));
routes.post("/signup", (req, res, next) => authController.signUp(req, res, next));
//#endregion

//#region UserAgregation
const userController = new UserController();
routes.get("/user", AuthMiddleware, (req, res, next) => userController.getAll(req, res, next));
routes.get("/user/:id", AuthMiddleware, (req, res, next) => userController.getById(req, res, next));
routes.post("/user", AuthMiddleware, (req, res, next) => userController.create(req, res, next));
routes.put("/user/:id", AuthMiddleware, (req, res, next) => userController.update(req, res, next));
routes.delete("/user/:id", AuthMiddleware, (req, res, next) => userController.delete(req, res, next));
//#endregion

export default routes;
