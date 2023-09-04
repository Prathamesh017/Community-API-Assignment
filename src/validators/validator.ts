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
  scopes: Joi.array().items(Joi.string())
});
export const communityValidation = Joi.object({
  name: Joi.string().min(2).required(),
});

export const memberValidation = Joi.object({
  community: Joi.string().required(),
  user: Joi.string().required(),
  role: Joi.string().required(),
  

});


