import joi from "joi";

export const WorkExperianceValidation = (data: any) => joi.object({
    vessel: joi.string(),
    vesselType: joi.string(),
    flag: joi.string(),
    rank: joi.string(),
    dwt: joi.string(),
    grt: joi.string(),
    bhp: joi.string(),
    engineType: joi.string(),
    startDate: joi.date(),
    endDate: joi.date(),
    manningAgentsOrOwners: joi.string(),
    reason: joi.string(),
}).validateAsync(data, { abortEarly: true })