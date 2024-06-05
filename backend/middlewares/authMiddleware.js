import { StatusCodes } from "http-status-codes";
import { withValidationErrors } from "./withErrorMiddleware.js";
import pool from "../db.js";
import { body } from "express-validator";

export const validateLogin = withValidationErrors([
  body("username").notEmpty().withMessage(`Username is required`),
  body("password").notEmpty().withMessage(`Password is required`),
]);
