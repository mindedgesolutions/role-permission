import { faker } from "@faker-js/faker";
import pool from "../db.js";

const generateUser = () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    mobile: faker.phone.number(),
    role_id: faker.number.int({ min: 1, max: 3 }),
  };
  return user;
};

const insertUser = async (user) => {
  const data = await pool.query(
    `insert into users(name, email, mobile, role_id) values($1, $2, $3, $4)`,
    [user.name, user.email, user.mobile, user.role_id]
  );
};

const insertUserDb = () => {
  for (let index = 0; index < 100; index++) {
    const fakerUser = generateUser();
    insertUser(fakerUser);
  }
};

insertUserDb();
