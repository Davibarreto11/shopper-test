import "dotenv/config";
import AppError from "@/shared/errors/AppError";
import express, { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());

app.use((err: Error, __: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "Error",
    message: err.message,
  });
});

app.listen(process.env.API_PORT, () => {
  console.log(`Server starterd on port ${process.env.API_PORT}`);
});
