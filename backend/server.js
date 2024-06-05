import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import express from "express";
const app = express();

// Middlewares ------
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

// Routes ------
import authRoute from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

if (process.env.APP_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

// API starts ------
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
// API ends ------

const port = process.env.APP_PORT || 3001;

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(`Not found`);
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
