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
    dateOfIssue: joi.string(),
    dateOfExpiry: joi.string(),
    certificateLink: joi.string(),
})

export const typeMedicalDetailsValidation = (data: TypeMedicalDetailsInterface) => 
    typeMedicalDetails.validateAsync(data, { abortEarly: true })



export const MedicalDetailsValidation = (data: any) => joi.object({
    typeMedicalDetails:joi.array().items(typeMedicalDetails),
    Yellow_fever_vaccination: {
        placeOfIssue: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        link: "",
    },
    Covid_vaccination: {
        lastDoseDate: "",
        link: ""
    },
})