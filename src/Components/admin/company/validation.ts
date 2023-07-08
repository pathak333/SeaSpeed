import joi from "joi";



 const manager = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.number().required(),
    address: joi.string().allow(""),
    type: joi.string().valid("ship", "crew", "agency").required()
});

export const managerJoi = (data:any)=>manager.validateAsync(data, { abortEarly: true });
  
export const companyJoi = (data:any) => joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    email: joi.string().optional().allow(""),
    phone: joi.number().optional().allow(""),
    logo: joi.string().allow(""),
    doc: joi.array(),
    manager:joi.array().items(manager)
}).validateAsync(data, { abortEarly: true });
  


export const vesselJoi = (data:any) => joi.object({
  name: joi.string().required(),
  imoNumber: joi.string().required(),
  flag: joi.string().required(),
 // certificate: joi.array().required(),
  type: joi.string().required(),
  company: joi.object().required(),
  crewManagerId:joi.object().required(),
  shipManagerId: joi.object().required(),
}).validateAsync(data, { abortEarly: true });




  