import { StatusCodes } from "http-status-codes";
import pool from "../db.js";
import { BadRequestError } from "../errors/customErrors.js";
import { comparePassword } from "../utils/passwordUtils.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const checkUser = await pool.query(
    `select count(id)::INTEGER from users where email=$1`,
    [username.toLowerCase()]
  );

  if (checkUser.rows[0].count === 0) {
    throw new BadRequestError(`User doesn't exist`);
  }

  const user = await pool.query(
    `select * from users where email='${username.toLowerCase()}'`
  );

  const checkPass = await comparePassword(password, user.rows[0].password);

  if (!checkPass) {
    throw new BadRequestError(`Incorrect password`);
  }

  const payload = {
    uuid: user.rows[0].uuid,
  };
  const oneDay = 1000 * 60 * 60 * 24;

  const token = jwt.sign(payload, process.env.JWT_SECRET_ADMIN, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.ACCEPTED).json({ data: user.rows[0] });
};

export const userAccess = async (req, res) => {
  res.status(StatusCodes.OK).json({ data: `success` });
};
