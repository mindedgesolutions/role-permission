import { StatusCodes } from "http-status-codes";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import { paginationLogic } from "../utils/functions.js";

export const currentUser = async (req, res) => {
  const { token } = req.cookies;
  const userUuid = jwt.decode(token)?.uuid;
  const data = await pool.query(
    `select users.*, roles.role from users join roles on users.role_id = roles.id where users.uuid=$1`,
    [userUuid]
  );
  res.status(StatusCodes.OK).json({ data: data.rows[0] });
};

// ------
export const allUsers = async (req, res) => {
  const { page, search, searchRole } = req.query;
  const { type } = req.params;
  const pagination = paginationLogic(page, null);

  const searchStr = search
    ? ` and (users.name ilike '%${search.trim()}%' or users.email ilike '%${search.trim()}%' or users.mobile ilike '%${search.trim()}%')`
    : ``;
  const searchDrp = searchRole ? ` and users.role_id=${searchRole}` : ``;
  const roleWise = type ? ` and users.role_id=${type}` : ``;

  const data = await pool.query(
    `select users.*, roles.role from users join roles on users.role_id = roles.id where users.id is not null ${searchStr} ${searchDrp} ${roleWise} order by roles.role, users.name offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select users.* from users join roles on users.role_id = roles.id where users.id is not null ${searchStr} ${searchDrp} ${roleWise}`,
    []
  );
  const totalPages = Math.ceil(records.rowCount / pagination.pageLimit);
  const meta = {
    totalPages: totalPages,
    currentPage: pagination.pageNo,
    totalRecords: records.rowCount,
  };

  res.status(StatusCodes.OK).json({ data, meta });
};

// ------
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(
    `update users set is_active=false where id=$1`,
    [id]
  );
  res.status(StatusCodes.NO_CONTENT).json({ data: `success` });
};

// ------
export const activateUser = async (req, res) => {
  const { id } = req.params;
  const data = await pool.query(`update users set is_active=true where id=$1`, [
    id,
  ]);
  res.status(StatusCodes.ACCEPTED).json({ data: `success` });
};
