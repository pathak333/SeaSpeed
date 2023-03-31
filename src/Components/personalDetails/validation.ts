import joi from "joi";

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
  joi.object({
    firstname: joi.string(),
    lastname: joi.string(),
    dob: joi.string().label("BirthDate"),
    gender: joi.string(),
    marital_status: joi.string(),
    flatnumber: joi.string(),
    society: joi.string(),
    city: joi.string(),
    state: joi.string(),
    country: joi.string(),
    pincode: joi.number(),
    nearest_airport: joi.string(),
    isSameAddress: joi.boolean(),
  }).validateAsync(data, { abortEarly: true });

export const EducationValidation = async (data: any) =>
  joi.array().items(
    await joi.object({
      institution: joi.string(),
      qualification: joi.string(),
      startDate: joi.string().allow(""),
      endDate: joi.string().allow(""),
      city: joi.string(),
      country: joi.string(),
    }).validateAsync(data, { abortEarly: true })
  );

export const BankDetailValidation = async (data: any) =>
  await joi.object({
    bank_name: joi.string().required(),
    account_holder_name: joi.string().required(),
    branch_code: joi.string().required(),
    account_number: joi.number().required(),
    swift_code: joi.string().required(),
    IBAN_number: joi.string().required(),
    IFSC_code: joi.string().required(),
    account_type: joi.string().required(),
  }).validateAsync(data, { abortEarly: true });


export const KinDetailValidation = async (data: any) => joi.object({
  fullName: joi.string().required(),
  relationship: joi.string().required(),
  code: joi.string().required(),
  phoneNumber: joi.string().required(),
  email: joi.string().required(),
  flatnumber: joi.string().required(),
  society: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  country: joi.string().required(),
  pincode: joi.string().required(),
  bankName: joi.string().required(),
  accountHolderName: joi.string().required(),
  branchCode: joi.string().required(),
  accountNumber: joi.string().required(),
  swiftCode: joi.string().required(),
  ifscCode: joi.string().required(),
  iban: joi.string().required(),
  accountType: joi.string().required(),
  wifeDetail: joi.object({
    name: joi.string().required(),
    dob: joi.string().required(),
    passport: joi.string().required(),
    passportNumber: joi.string().required(),
    dateOfIssues: joi.string().required(),
    dateOfExpiry: joi.string().required(),
    nameOfChild: joi.string().required(),
  }),
}).validateAsync(data, { abortEarly: true });