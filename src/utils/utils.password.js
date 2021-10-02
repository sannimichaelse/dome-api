import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => {
  const result = await bcrypt.hash(password, saltRounds);
  return result;
};

export const comparePassword = async (password, hash_password) => {
  const valid = await bcrypt.compare(password, hash_password);
  return valid;
};
