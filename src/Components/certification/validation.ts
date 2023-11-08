import joi from "joi";


export const CertificateOfCompetencyValidation = (data: any) => joi.object({
    grade: joi.string(),
    licenseNumber: joi.number(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
    issuingAuthorityCountry: joi.string(),
    documentId:joi.string().optional().allow("")
}).validateAsync(data, { abortEarly: true })



export const FlagEndorsementValidation = (data: any) => joi.object({
    name: joi.string(),
    number: joi.number(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
    documentId:joi.string().optional().allow(""),
     Oil_tanker_DCE: joi.string().valid("Support", "Operation", "Management")
}).validateAsync(data, { abortEarly: true })