import joi from "joi";


export const PassportValidation = (data: any) => joi.object({
    passportNumber: joi.string(),
    placeOfIssue: joi.string(),
    dateOfIssue: joi.date(),
    dateOfExpiry: joi.date(),
    documentId: joi.string().required(),
   // ECNR: joi.string(),
}).validateAsync(data, { abortEarly: true })

const NormalVisaJoiObject = joi.object({
    visatype: joi.string(),
    placeOfIssue: joi.string(),
    number: joi.string(),
    dateOfIssue: joi.date(),
    dateOfExpiry: joi.date(),
    documentId: joi.string().required(),
})

export const NormalVisaValidation = (data:any)=> NormalVisaJoiObject.validateAsync(data, { abortEarly: true })

export const VisaDetailValidation = (data: any) => joi.object({
    visaList:joi.array().when("haveNoVisa", {
        is: true,
        then:joi.array().optional(),
        otherwise:joi.array().items(
            NormalVisaJoiObject
        ).min(1).required(),
    }),
    us_placeOfIssue: joi.when("haveNoUsVisa", {
        is: true,
        then: joi.string().forbidden(),
        otherwise: joi.string().required(),

    }),
    us_number:joi.when("haveNoUsVisa", {
        is: true,
        then: joi.string().forbidden(),
        otherwise: joi.string().required(),

    }),
    us_dateOfIssue:joi.when("haveNoUsVisa", {
        is: true,
        then: joi.date().forbidden(),
        otherwise: joi.date().required(),

    }),
    us_dateOfExpiry:joi.when("haveNoUsVisa", {
        is: true,
        then: joi.date().forbidden(),
        otherwise: joi.date().required(),

    }),
   
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
    number: joi.string(),
    dateOfIssue: joi.date(),
    dateOfExpiry: joi.date(),
    sidNumber: joi.string(),
    Indos: joi.string().optional().allow(""),
    documentId:joi.string().required(),
}).validateAsync(data, { abortEarly: true })


