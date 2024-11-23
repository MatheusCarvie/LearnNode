import express from "express";
import routes from "./routes";
import connectToDatabase from "./Infrastructure/db-context";
import dotenv from "dotenv";
import ErrorMiddleware from "./Infrastructure/middlewares/error.middlewares";

const main = async () => {
  dotenv.config();

  await connectToDatabase();

  const app = express();

  // Habilitar json
  app.use(express.json());
  // Encaminhar rotas
  app.use(routes);
  // Middleware de erros
  app.use(ErrorMiddleware);

  app.listen(String(process.env.PORT), () => {
    console.log("Server started");
  });
};

main();
