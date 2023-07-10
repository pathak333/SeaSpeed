import joi, { options } from "joi";

interface ValidatePersonalDetailData {
  // firstname: String;
  // lastname: String;
  dob: String;
  gender: String;
  marital_status: String;
  birthPlace: String;
  flatnumber: String;
  society: String;
  nationality: String,

  city: String;
  state: String;
  country: String;
  pincode: number;
  nearest_airport: String;
  isSameAddress: Boolean;
  aadhaar: String;
  pan: String;
  CNC: String;
}


export const ContactDetailValidation = (data: any) =>
  joi.object({
    alt_phone_no: joi.string().optional(),
    alt_email: joi.string().email({ tlds: { allow: false } }).optional(),
    alt_country_code: joi.string().optional(),
  }).validateAsync(data, { abortEarly: true });



export const PersonalDetailValidation = (data: ValidatePersonalDetailData) =>
  joi
    .object({
      // firstname: joi.string().optional(),
      // lastname: joi.string(),
      dob: joi.string().required(),
      gender: joi.string().valid("male", "female"),
      marital_status: joi.string().valid("married", "unmarried"),
      birthPlace: joi.string().optional(),
      nationality: joi.string().valid("Indian", "Pakistani","Ukrainian","Russian").required(),
      flatnumber: joi.string().required(),
      society: joi.string().required(),
      city: joi.string().required(),
      state: joi.string().required(),
      country: joi.string().required(),
      pincode: joi.number().required(),
      nearest_airport: joi.string().optional(),
      isSameAddress: joi.boolean().default(true),
      flatnumber2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      society2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      city2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      state2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      country2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string(),
      }),
      pincode2: joi.number().when("isSameAddress", {
        is: false,
        then: joi.number().required(),
        otherwise: joi.number(),
      }),
      //  nearest_airport2: joi.string().when("isSameAddress", {
      //   is: false,
      //   then: joi.string().required(),
      //   otherwise: joi.string(),
      // }),
      aadhaar: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().required(),
        otherwise:joi.string().optional().allow("")
      }),
      pan: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().required(),
        otherwise:joi.string().optional().allow("")
      }),
      CNC:joi.string().optional().allow("")
    })
    .validateAsync(data, { abortEarly: true });

export const UpdatePersonalDetailValidation = (data: any) =>
  joi
    .object({
      // firstname: joi.string().optional(),
      // lastname: joi.string(),
      dob: joi.string().label("BirthDate").optional().allow(""),
      gender: joi.string().optional().allow(""),
      marital_status: joi.string().valid("married", "unmarried").optional().allow(""),
      birthPlace: joi.string().optional().allow(""),
      nationality: joi.string().required().optional().allow(""),
      flatnumber: joi.string().optional().allow(""),
      society: joi.string().optional().allow(""),
      city: joi.string().optional().allow(""),
      state: joi.string().optional().allow(""),
      country: joi.string().optional().allow(""),
      pincode: joi.number().optional().allow(""),
      nearest_airport: joi.string().optional().allow(""),
      isSameAddress: joi.boolean().optional(),
      aadhaar: joi.string().optional().allow(""),
      pan: joi.string().optional().allow(""),
      CNC: joi.string().optional().allow(""),
       flatnumber2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string().optional().allow(""),
      }),
      society2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string().optional().allow(""),
      }),
      city2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string().optional().allow(""),
      }),
      state2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string().optional().allow(""),
      }),
      country2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().required(),
        otherwise: joi.string().optional().allow(""),
      }),
      pincode2: joi.number().when("isSameAddress", {
        is: false,
        then: joi.number().required(),
        otherwise: joi.number().optional().allow(""),
      }),
      //  nearest_airport2: joi.string().when("isSameAddress", {
      //   is: false,
      //   then: joi.string().required(),
      //   otherwise: joi.string(),
      // }),

    })
    .validateAsync(data, { abortEarly: true });

export const EducationValidation = async (data: any) =>
  joi.array().items(
    await joi
      .object({
        institution: joi.string().required(),
        qualification: joi.string(),
        startDate: joi.string().required(),
        endDate: joi.string().required(),
        city: joi.string().required(),
        country: joi.string().required(),
      })
      .validateAsync(data, { abortEarly: true })
  );

export const BankDetailValidation = async (data: any) =>
  await joi
    .object({
      bank_name: joi.string().required(),
      account_holder_name: joi.string().required(),
      branch_code: joi.string().required(),
      account_number: joi.number().required(),
      swift_code: joi.string().required(),
      IBAN_number: joi.string().optional().allow(""),
      IFSC_code: joi.string().optional().allow(""),
      account_type: joi.string().valid("USD", "INR", "PKR", "AED").required(),
    })
    .validateAsync(data, { abortEarly: true });

export const UpdateBankDetailValidation = async (data: any) =>
  await joi
    .object({
      bank_name: joi.string().optional(),
      account_holder_name: joi.string().optional(),
      branch_code: joi.string().optional(),
      account_number: joi.number().optional(),
      swift_code: joi.string().optional(),
      IBAN_number: joi.string().optional(),
      IFSC_code: joi.string().optional(),
      account_type: joi.string().valid("USD", "INR", "PKR", "AED").optional(),
    })
    .validateAsync(data, { abortEarly: true });

export const KinDetailValidation = async (data: any) =>
  joi
    .object({
      fullName: joi.string().required(),
      relationship: joi.string().required(),
      code: joi.string().required(),
      phoneNumber: joi.string().pattern(/^[0-9]{10}$/).required(),
      email: joi.string().email({ tlds: { allow: false } }).required(),
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
      ifscCode: joi.string().optional().allow(""),
      iban: joi.string().optional().allow(""),
      accountType: joi.string().required(),
      wifeDetail: joi.object({
        name: joi.string().required(),
        dob: joi.string().required(),
        passport: joi.string().required(),
        passportNumber: joi.string().when("passport", {
          is: "No",
          then: joi.string().optional().allow(""),
          otherwise:joi.string().required()
        }),
        dateOfIssues: joi.string().when("passport", {
          is: "No",
          then: joi.string().optional().allow(""),
          otherwise:joi.string().required()
        }),
        dateOfExpiry: joi.string().when("passport", {
          is: "No",
          then: joi.string().optional().allow(""),
          otherwise:joi.string().required()
        }),
        nameOfChild: joi.string().optional().allow(""),
      }),
    })
    .validateAsync(data, { abortEarly: true });
