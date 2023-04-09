import joi from "joi";


export const PassportValidation = (data: any) => joi.object({
    passportNumber: joi.string(),
    placeOfIssue: joi.string(),
    dateOfIssue: joi.date(),
    dateOfExpiry: joi.date(),
    ECNR: joi.string(),
}).validateAsync(data, { abortEarly: true })

const NormalVisaJoiObject = joi.object({
    visatype: joi.string(),
    placeOfIssue: joi.string(),
    number: joi.number(),
    dateOfIssue: joi.date(),
    dateOfExpiry: joi.date(),
})

export const NormalVisaValidation = (data:any)=> NormalVisaJoiObject.validateAsync(data, { abortEarly: true })

export const VisaDetailValidation = (data: any) => joi.object({
    visaList: joi.array().items(
        NormalVisaJoiObject
    ),
    us_placeOfIssue: joi.string(),
    us_number: joi.number(),
    us_dateOfIssue: joi.date(),
    us_dateOfExpiry: joi.date(),
    haveNoVisa: joi.bool(),
    haveNoUsVisa: joi.bool(),
}).validateAsync(data, { abortEarly: true })


// export const SeamenBookValidation = (data: any) => joi.array().items(joi.object({
//     placeOfIssue: joi.string(),
//     number: joi.number(),
//     dateOfIssue: joi.date(),
//     dateOfExpiry: joi.date(),
//     sidNumber: joi.string(),
//     Indos: joi.string(),
// })).validateAsync(data, { abortEarly: true })

export const SeamenBookValidation = (data: any) => joi.object({
    placeOfIssue: joi.string(),
    number: joi.number(),
    dateOfIssue: joi.date(),
    dateOfExpiry: joi.date(),
    sidNumber: joi.string(),
    Indos: joi.string(),
}).validateAsync(data, { abortEarly: true })