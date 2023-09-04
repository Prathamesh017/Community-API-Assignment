import * as Joi from 'joi';
export const userRegisterValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const userLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const roleValidation = Joi.object({
  name: Joi.string().min(2).required(),

});

