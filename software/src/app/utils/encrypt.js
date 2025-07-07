import bcrypt from "bcrypt";

export const encryptPassword = async (senha) => {
  return bcrypt.hash(senha, Number(process.env.PASSWORD_SALT_ROUNDS));
};

export const isPasswordValid = async (plainTextPassword, hashedPassword) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};
