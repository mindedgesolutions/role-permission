import { StatusCodes } from "http-status-codes";
import pool from "../db.js";
import jwt from "jsonwebtoken";

export const currentUser = async (req, res) => {
  const { token } = req.cookies;
  const userUuid = jwt.decode(token)?.uuid;
  const data = await pool.query(`select * from users where uuid=$1`, [
    userUuid,
  ]);
  res.status(StatusCodes.OK).json({ data: data.rows[0] });
};
