import joi from "joi";

export const ValidationCrew = async (data: any) => await joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email({ tlds: { allow: false } }).required(),
  code: joi.string().required(),
  phone_no: joi
    .string()
    .required()
    .messages({
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
  rank: joi.object().required(),
  joiningDate: joi.string().allow(""),
  joiningPort: joi.string().allow(""),
  vessel: joi.object().empty({}).unknown(true).optional(),
}).validateAsync(data, { abortEarly: true });