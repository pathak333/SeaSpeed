import joi from "joi";


export const CourseCertificateValidation = (data: any) => joi.object({
    courseName: joi.string(),
    certificateName:joi.string(),
    placeOfIssue: joi.string(),
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    documentId: joi.string().required(),
}).validateAsync(data, { abortEarly: true })
  
