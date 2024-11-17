import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import connectToDatabase from "./Infrastructure/db-context";
import HttpError from "./Infrastructure/errors/http-error";
import dotenv from "dotenv";

const main = async () => {
  dotenv.config();

  await connectToDatabase();

  const app = express();

  // Habilitar json
  app.use(express.json());
  // Encaminhar rotas
  app.use(routes);

  // Middleware de erros
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpError) return res.status(error.statusCode).json({ error: error.message });

    console.log("Error: ", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  });

  app.listen(process.env.PORT, () => {
    console.log("Server started");
  });
};

main();
