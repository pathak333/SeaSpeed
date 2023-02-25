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
