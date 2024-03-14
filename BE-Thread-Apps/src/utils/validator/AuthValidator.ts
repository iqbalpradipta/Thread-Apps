import * as Joi from 'joi';

export const AuthUsersScheme = Joi.object({
  username: Joi.string().min(10).allow(null),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
