import pool from "../db.js";

export const getUserId = async (uuid) => {
  const user = await pool.query(`select id from users where uuid=$1`, [uuid]);
  return user.rows[0].id;
};

export const paginationLogic = (page, limit) => {
  const pageLimit = limit || process.env.ITEMS_PER_PAGE;
  const pageNo = Number(page) || 1;
  const offset = (pageNo - 1) * Number(pageLimit);

  return { pageLimit, offset, pageNo };
};
