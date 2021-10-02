import HttpStatus from 'http-status-codes';
import logger from '../config/logger';
import User from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/utils.password';

export const saveUser = async (body) => {
  const { email, password } = body;
  const user = await findUser(email);
  if (user) {
    throw {
      message: 'User Already Exists',
      status: 'error',
      code: HttpStatus.CONFLICT,
      data: null
    };
  }
  const hashed_password = await hashPassword(password);
  body.password = hashed_password;
  const data = await User.create(body);
  logger.info('User created successful');
  return {
    message: 'User created Successfully',
    status: 'success',
    code: HttpStatus.CREATED,
    data
  };
};

export const loginUser = async (body) => {
  const { email, password } = body;
  const user = await findUser(email);
  if (!user) {
    throw {
      message: 'Wrong Email and Password Combination',
      status: 'error',
      code: HttpStatus.NOT_FOUND,
      data: null
    };
  }

  const is_valid_password = await comparePassword(password, user.password);
  if (!is_valid_password) {
    throw {
      message: 'Wrong Password and Email Combination',
      status: 'error',
      code: HttpStatus.NOT_FOUND,
      data: null
    };
  }

  return {
    code: HttpStatus.OK,
    message: 'Authentication Successful',
    status: 'success',
    data: {
      user
    }
  };
};

export const findUser = async (email) => {
  return User.findOne({ email });
};
