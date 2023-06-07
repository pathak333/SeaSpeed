import joi from "joi";

export const RefrenceValidation = (data: any) => joi.object({
    companyName: joi.string(),
    address: joi.string(),
    personInCharge: joi.string(),
    titledOfPersonInCharge: joi.string(),
    phoneNumber: joi.string().pattern(/^[0-9]{10}$/),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
}).validateAsync(data, { abortEarly: true })