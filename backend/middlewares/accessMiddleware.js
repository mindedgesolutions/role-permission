import pool from "../db.js";
import { UnauthorizedError } from "../errors/customErrors.js";

export const checkAccess = async (req, res, next) => {
  const { role, url } = req.query;
  const urlExists = await pool.query(
    `select count(id)::INTEGER from site_urls where path=$1`,
    [url]
  );
  if (urlExists.rows > 0) {
    const check = await pool.query(
      `select count(id)::INTEGER from site_urls where path=$1 and $2 = ANY(string_to_array(roles, ','))`,
      [url, role]
    );
    if (check.rows[0].count === 0) {
      throw new UnauthorizedError(`You're not authorized to access this page`);
    }
    next();
  }
  next();
};
