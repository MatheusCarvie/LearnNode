import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorMessages from "../errors/error-messages";

const AuthMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;
  if (!token) return response.status(401).json({ status: 401, error: ErrorMessages.Auth.INVALID_OR_EXPIRED_TOKEN });

  try {
    // Substitui o Bearer por vazio para obter apenas o token
    const replace = token.replace("Bearer ", "");
    jwt.verify(replace, String(process.env.TOKEN_KEY));
    next();
  } catch (error) {
    return response.status(401).json({ status: 401, error: ErrorMessages.Auth.INVALID_OR_EXPIRED_TOKEN });
  }
};

export default AuthMiddleware;
