import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const signupValidator = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().trim().required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().trim().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next({
      code: HttpStatus.BAD_REQUEST,
      message: error.message.replace(/[\"]/gi, ''),
      status: 'error',
      data: null
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().trim().min(6).required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next({
      code: HttpStatus.BAD_REQUEST,
      message: error.message.replace(/[\"]/gi, ''),
      status: 'error',
      data: null
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
