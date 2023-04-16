import joi from "joi";

export const RefrenceValidation = (data: any) => joi.object({
    companyName: joi.string(),
    address: joi.string(),
    personInCharge: joi.string(),
    titledOfPersonInCharge: joi.string(),
    phoneNumber: joi.string(),
    email:joi.string().email()
}).validateAsync(data, { abortEarly: true })