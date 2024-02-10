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
  aadhaar?: String;
  pan?: String;
  CNC?: String;
  aadhaarId: String,
  panId: String,
  cncId?: String,
}


export const ContactDetailValidation = (data: any) =>
  joi.object({
    alt_phone_no: joi.string().optional(),
    alt_email: joi.string().email({ tlds: { allow: false } }).optional(),
    //  alt_country_code: joi.string().optional(),
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
      nationality: joi.string().valid("Indian", "Pakistani", "Ukrainian", "Russian").required(),
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
      aadhaar: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow("")
      }),
      pan: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow("")
      }),
      CNC: joi.string().when("nationality", {
        is: "Pakistani",
        then: joi.string().required(),
        otherwise: joi.string().optional().allow("")
      }), 
      aadhaarId: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow("")
      }),
      panId: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow("")
      }),
      cncId: joi.string().when("nationality", {
        is: "Pakistani",
        then: joi.string().required(),
        otherwise: joi.string().optional().allow("")
      }),
     
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
      aadhaar: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow("")
      }),
      pan: joi.string().when("nationality", {
        is: "Indian",
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow("")
      }),

      CNC: joi.string().when("nationality", {
        is: "Pakistani",
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow("")
      }),
      flatnumber2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow(""),
      }),
      society2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow(""),
      }),
      city2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow(""),
      }),
      state2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow(""),
      }),
      country2: joi.string().when("isSameAddress", {
        is: false,
        then: joi.string().optional().allow(""),
        otherwise: joi.string().optional().allow(""),
      }),
      pincode2: joi.number().when("isSameAddress", {
        is: false,
        then: joi.number().optional().allow(""),
        otherwise: joi.number().optional().allow(""),
      }),
      aadhaarId: joi.string().allow("").optional(),
      panId: joi.string().allow("").optional(),
      cncId: joi.string().allow("").optional(),
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
      branch_code: joi.string().optional().allow(""),
      account_number: joi.string().required(),
      swift_code: joi.string().optional().allow(""),
      IBAN_number: joi.string().optional().allow(""),
      IFSC_code: joi.string().optional().allow(""),
      account_type: joi.string().valid("USD", "INR", "PKR", "AED").required(),
      documentId: joi.string().optional().allow(""),
    })
    .validateAsync(data, { abortEarly: true });

export const UpdateBankDetailValidation = async (data: any) =>
  await joi
    .object({
      bank_name: joi.string().optional(),
      account_holder_name: joi.string().optional(),
      branch_code: joi.string().optional(),
      account_number: joi.string().optional(),
      swift_code: joi.string().optional().allow("") ,
      IBAN_number: joi.string().optional(),
      IFSC_code: joi.string().optional(),
      account_type: joi.string().valid("USD", "INR", "PKR", "AED").optional(),
      documentId: joi.string().optional().allow(""),

    })
    .validateAsync(data, { abortEarly: true });

export const KinDetailValidation = async (data: any) =>
  joi
    .object({
      fullName: joi.string().required(),
      relationship: joi.string().required(),
      // code: joi.string().required(),
      phoneNumber: joi.string().required(),
      email: joi.string().email({ tlds: { allow: false } }).required(),
      flatnumber: joi.string().required(),
      society: joi.string().required(),
      city: joi.string().required(),
      state: joi.string().required(),
      country: joi.string().required(),
      pincode: joi.string().required(),
      bankName: joi.string().optional().allow(""),
      accountHolderName: joi.string().optional().allow(""),
      branchCode: joi.string().optional().allow(""),
      accountNumber: joi.string().optional().allow(""),
      swiftCode: joi.string().optional().allow(""),
      ifscCode: joi.string().optional().allow(""),
      iban: joi.string().optional().allow(""),
      accountType: joi.string().optional().allow(""),
      wifeDetail: joi.object({
        name: joi.string().optional().allow(""),
        dob: joi.string().optional().allow(""),
        passport: joi.string().optional().allow(""),
        passportNumber: joi.string().when("passport", {
          is: "No",
          then: joi.string().optional().allow(""),
          otherwise: joi.string().optional().allow("")
        }),
        dateOfIssues: joi.string().when("passport", {
          is: "No",
          then: joi.string().optional().allow(""),
          otherwise: joi.string().optional().allow("")
        }),
        dateOfExpiry: joi.string().when("passport", {
          is: "No",
          then: joi.string().optional().allow(""),
          otherwise: joi.string().optional().allow("")
        }),
        nameOfChild: joi.string().optional().allow(""),
      }),
    })
    .validateAsync(data, { abortEarly: true });
