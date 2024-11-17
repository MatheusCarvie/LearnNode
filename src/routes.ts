import { Router } from "express";
import UserController from "./controllers/user.controller";

const routes = Router();

//#region UserAgregation
const userController = new UserController();
routes.get("/user", (req, res, next) => userController.getAll(req, res, next));
routes.get("/user/:id", (req, res, next) => userController.getById(req, res, next));
routes.post("/user", (req, res, next) => userController.create(req, res, next));
routes.put("/user/:id", (req, res, next) => userController.update(req, res, next));
routes.delete("/user/:id", (req, res, next) => userController.delete(req, res, next));
//#endregion

export default routes;
