import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { generatePassword } from "../utils/passwordUtils.js";

const updateUuid = async () => {
  const users = await pool.query(`select id from users`);

  for (const user of users.rows) {
    const userUuid = uuidv4();
    const pass = await generatePassword("welcome123");
    await pool.query(`update users set uuid=$1, password=$3 where id=$2`, [
      userUuid,
      user.id,
      pass,
    ]);
  }
};
updateUuid();
