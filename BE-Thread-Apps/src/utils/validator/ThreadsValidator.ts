import * as Joi from 'joi';

export const createThreadsScheme = Joi.object({
  content: Joi.string().min(10).allow(null),
  image: Joi.string().allow(null),
});
