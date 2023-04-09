import joi from "joi";


export const CertificateOfCompetencyValidation = (data: any) => joi.object({
    grade: joi.string(),
    licenseNumber: joi.string(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
    issuingAuthorityCountry: joi.string(),
}).validateAsync(data, { abortEarly: true })



export const FlagEndorsement = (data: any) => joi.object({
    name: joi.string(),
    number: joi.string(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
}).validateAsync(data, { abortEarly: true })