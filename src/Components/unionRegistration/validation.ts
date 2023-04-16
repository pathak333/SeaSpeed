import joi from "joi";

export const UnionRegistrationValidation = (data: any) => joi.object({
    unionName: joi.string(),
    membershipNumber: joi.string(),
    dateOfJoiningUnion: joi.date(),
    rank:joi.string(),
}).validateAsync(data, { abortEarly: true })