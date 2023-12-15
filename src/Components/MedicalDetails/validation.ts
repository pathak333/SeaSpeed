import joi from "joi";

interface TypeMedicalDetailsInterface{
    type: string,
    placeOfIssue: string,
    dateOfIssue: string,
    dateOfExpiry: string,
    certificateLink: string,
}


export const typeMedicalDetails = joi.object({
    type: joi.string(),
    placeOfIssue: joi.string(),
    dateOfIssue: joi.date(),
    dateOfExpiry: joi.date(),
    certificateLink: joi.string().required(),
})

export const typeMedicalDetailsValidation = (data: TypeMedicalDetailsInterface) => 
    typeMedicalDetails.validateAsync(data, { abortEarly: true })



export const MedicalDetailsValidation = (data: any) => joi.object({
    typeMedicalDetails:joi.array().items(typeMedicalDetails),
    Yellow_fever_vaccination: {
        placeOfIssue: joi.string(),
        dateOfIssue: joi.string(),
        dateOfExpiry: joi.string(),
        link: joi.string().required(),
    },
    Covid_vaccination: {
        lastDoseDate: joi.string(),
        link: joi.string().required()
    },
}).validateAsync(data, { abortEarly: true })


export const UpdateMedicalDetailsValidation = (data: any) => joi.object({
    _id: joi.string(),
    user_id:joi.string(),
    typeMedicalDetails:joi.array().items(typeMedicalDetails).optional(),
    Yellow_fever_vaccination: {
        placeOfIssue: joi.string().optional(),
        dateOfIssue: joi.string().optional(),
        dateOfExpiry: joi.string().optional(),
        link: joi.string().optional(),
    },
    Covid_vaccination: {
        lastDoseDate: joi.string().optional(),
        link: joi.string().optional()
    },
}).validateAsync(data, { abortEarly: true })
