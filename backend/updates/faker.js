import { faker } from "@faker-js/faker";
import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";
import { generatePassword } from "../utils/passwordUtils.js";

const generateUser = () => {
  const pass = generatePassword("welcome123");
  const userUuid = uuidv4();

  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    mobile: faker.phone.number(),
    role_id: faker.number.int({ min: 1, max: 3 }),
    password: pass,
    uuid: userUuid,
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
