import joi from "joi";

export const ValidationCrew = () => joi.object({
    firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email().required(),
  phone_no: joi
    .string()
    .pattern(new RegExp("^[0-9]{10}$"))
    .required()
    .messages({
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
  rank: joi.string().required(),
  joiningDate: joi.string().required(),
  joiningPort: joi.string().required(),
  vessel: joi.string().required(),
})