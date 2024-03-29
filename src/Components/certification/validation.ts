import joi from "joi";


export const CertificateOfCompetencyValidation = (data: any) => joi.object({
    grade: joi.string(),
    licenseNumber: joi.string(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
    issuingAuthorityCountry: joi.string(),
    documentId:joi.string().required()
}).validateAsync(data, { abortEarly: true })



export const FlagEndorsementValidation = (data: any) => joi.object({
    name: joi.string(),
    number: joi.string(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    placeOfIssue: joi.string(),
    documentId:joi.string().required(),
     Oil_tanker_DCE: joi.string().valid("Support", "Operation", "Management")
}).validateAsync(data, { abortEarly: true })