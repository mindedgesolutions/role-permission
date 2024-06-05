import bcrypt from "bcrypt";

export const generatePassword = async (value) => {
  const salt = bcrypt.genSaltSync(10);
  const password = await bcrypt.hash(value, salt);
  return password;
};

export const comparePassword = async (password, encPassword) => {
  const match = await bcrypt.compare(password, encPassword);
  return match;
};
