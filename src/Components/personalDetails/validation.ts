import Joi from "joi";

interface ValidatePersonalDetailData {
  firstname: String;
  lastname: String;
  dob: String;
  gender: String;
  marital_status: String;
  flatnumber: String;
  society: String;
  city: String;
  state: String;
  country: String;
  pincode: number;
  nearest_airport: String;
  isSameAddress: Boolean;
}

export const PersonalDetailValidation = (data: ValidatePersonalDetailData) =>
  Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    dob: Joi.string().label("BirthDate"),
    gender: Joi.string(),
    marital_status: Joi.string(),
    flatnumber: Joi.string(),
    society: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    pincode: Joi.number(),
    nearest_airport: Joi.string(),
    isSameAddress: Joi.boolean(),
  }).validateAsync(data, { abortEarly: true });

export const EducationValidation = async (data: any) =>
  Joi.array().items(
    await Joi.object({
      institution: Joi.string(),
      qualification: Joi.string(),
      startDate: Joi.string().allow(""),
      endDate: Joi.string().allow(""),
      city: Joi.string(),
      country: Joi.string(),
    }).validateAsync(data, { abortEarly: true })
  );

export const BankDetailValidation = async (data: any) =>
  await Joi.object({
    bank_name: Joi.string().required(),
    account_holder_name: Joi.string().required(),
    branch_code: Joi.string().required(),
    account_number: Joi.number().required(),
    swift_code: Joi.string().required(),
    IBAN_number: Joi.string().required(),
    IFSC_code: Joi.string().required(),
    account_type: Joi.string().required(),
  }).validateAsync(data, { abortEarly: true });
