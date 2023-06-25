import joi from "joi";


export const CertificateOfCompetencyValidation = (data: any) => joi.object({
    grade: joi.string(),
    licenseNumber: joi.number(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
    issuingAuthorityCountry: joi.string(),
    documentLink:joi.string().optional()
}).validateAsync(data, { abortEarly: true })



export const FlagEndorsementValidation = (data: any) => joi.object({
    name: joi.string(),
    number: joi.number(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
    documentLink:joi.string().optional(),
     Oil_tanker_DCE: joi.string().valid("Support", "Operation", "Management")
}).validateAsync(data, { abortEarly: true })