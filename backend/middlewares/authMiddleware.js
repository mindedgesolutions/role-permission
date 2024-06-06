import { withValidationErrors } from "./withErrorMiddleware.js";
import { body } from "express-validator";
import { UnauthenticatedError } from "../errors/customErrors.js";
import jwt from "jsonwebtoken";

export const validateLogin = withValidationErrors([
  body("username").notEmpty().withMessage(`Username is required`),
  body("password").notEmpty().withMessage(`Password is required`),
]);

export const protectRoute = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError(`Login required`);
  }
  try {
    const { uuid } = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    req.user = { uuid };
    next();
  } catch (error) {
    throw new UnauthenticatedError(`Login required`);
  }
};
