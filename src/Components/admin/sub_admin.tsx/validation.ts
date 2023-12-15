import joi from "joi"

export const SubAdminValidation = async (data:any) => await joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
  email: joi.string().email({ tlds: { allow: false } }).required(),
   // code:joi.string().required(),
    phone_no: joi
      .string()
      //.pattern(new RegExp("^[0-9]{10}$"))
      .required()
      .messages({
        "string.pattern.base": "Phone number must be a 10-digit number",
      }),
      permission: joi.array(),
  otherPermission:joi.object().allow({})
}).validateAsync(data, { abortEarly: true });