import joi from "joi"

export const SubAdminValidation = () => joi.object({
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
    access:joi.array().valid([])
})