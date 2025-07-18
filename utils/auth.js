import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
export const hashPassword = pw => bcrypt.hash(pw, SALT_ROUNDS);
export const comparePassword = (pw, hash) => bcrypt.compare(pw, hash);
