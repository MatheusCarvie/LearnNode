import { NextFunction, Request, Response } from "express";
import AuthService from "../application/services/auth.service";
import AuthModel from "../domain/model/auth.model";
import AuthValidation from "../application/validations/auth.validation";
import UserValidation from "../application/validations/user.validation";
import UserModel from "../domain/model/user.model";

class AuthController {
  private authService = new AuthService();

  // Logar
  async signIn(request: Request, response: Response, next: NextFunction) {
    const model = request.body as AuthModel;
    try {
      await AuthValidation.validate(model, { abortEarly: false });
      const token = await this.authService.signIn(model.email, model.password);
      return response.json(token);
    } catch (error) {
      next(error);
    }
  }

  // Cadastrar
  async signUp(request: Request, response: Response, next: NextFunction) {
    const model = request.body as UserModel;
    try {
      await UserValidation.validate(model, { abortEarly: false });
      const data = await this.authService.signUp(model);
      return response.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
