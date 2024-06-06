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

export const allUsers = async (req, res) => {
  const { page, search, searchRole } = req.query;
  const pagination = paginationLogic(page, null);

  const searchStr = search ? ` and users.name ilike '%${search.trim()}%'` : ``;
  const searchDrp = searchRole ? ` and users.role_id=${searchRole}` : ``;

  const data = await pool.query(
    `select users.*, roles.role from users join roles on users.role_id = roles.id where users.id is not null ${searchStr} ${searchDrp} order by roles.role, users.name offset $1 limit $2`,
    [pagination.offset, pagination.pageLimit]
  );

  const records = await pool.query(
    `select users.* from users join roles on users.role_id = roles.id where users.id is not null ${searchStr} ${searchDrp}`,
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
