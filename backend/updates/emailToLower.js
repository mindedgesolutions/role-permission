import pool from "../db.js";

const convertEmail = async () => {
  const emails = await pool.query(`select email, id from users`, []);
  for (const user of emails.rows) {
    await pool.query(`update users set email=$1 where id=$2`, [
      user.email.toLowerCase(),
      user.id,
    ]);
  }
};

convertEmail();
