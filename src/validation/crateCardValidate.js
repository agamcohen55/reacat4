import Joi from "joi";
import validation from "./validation";

const crateCardSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  web: Joi.string().min(14).allow(""),
  url: Joi.string().min(14).allow(""),
  alt: Joi.string().min(2).max(256).allow(""),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  housenumber: Joi.number().min(1).required(),
  zip: Joi.number().allow("").optional(),
});

const validateCrateCard = (inputToCheck) =>
  validation(crateCardSchema, inputToCheck);

export { validateCrateCard };
