import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";

const updateUuid = async () => {
  const users = await pool.query(`select id from users`);

  for (const user of users.rows) {
    const userUuid = uuidv4();
    await pool.query(`update users set uuid=$1 where id=$2`, [
      userUuid,
      user.id,
    ]);
  }
};
updateUuid();
