import { useReducer } from "react";
import InputField from "../inputField/inputField.component";
import SelectInput from "../inputField/selectInputField.comonent";

const KinDetail = () => {
  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      fullName: "",
      relationship: "",
      code: "",
      phoneNumber: "",
      email: "",
      flatnumber: "",
      society: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      bankName: "",
      accountHolderName: "",
      branchCode: "",
      accountNumber: "",
      swiftCode: "",
      ifscCode: "",
      iban: "",
      accountType: "",
      wifeDetail: {
        name: "",
        dob: "",
        passport: "",
        passportNumber: "",
        dateOfIssues: "",
        dateOfExpiry: "",
        nameOfChild:"",
      },
      error: { keys: "", values: "" },
    }
  );
  const errorReturn = (field: string) =>
    formEvent.error.keys === field ? formEvent.error.values : "";

  return (
    <form>
      <h3 className="ml-4 font-semibold">Kin details</h3>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"fullName"}
          label={"Full name"}
          type={"text"}
          error={errorReturn("fullName")}
          onChange={(e) => updateEvent({ firstname: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"relationship"}
          label={"Relationship"}
          type={"text"}
          error={errorReturn("relationship")}
          onChange={(e) => updateEvent({ firstname: e.target.value })}
        />
        <div className="flex flex-row">
          <InputField
            className="m-4 w-28"
            fieldName={"code"}
            label={"Code"}
            type={"text"}
            error={errorReturn("code")}
            onChange={(e) => updateEvent({ firstname: e.target.value })}
          />
          <InputField
            className="m-4 w-full"
            fieldName={"phone"}
            label={"Phone number"}
            type={"text"}
            error={errorReturn("phone")}
            onChange={(e) => updateEvent({ firstname: e.target.value })}
          />
        </div>
        <InputField
          className="m-4"
          fieldName={"email"}
          label={"Email"}
          type={"text"}
          error={errorReturn("email")}
          onChange={(e) => updateEvent({ firstname: e.target.value })}
        />
      </div>
      <p className="text-xl font-medium ml-4">Kin address details</p>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"flatnumber"}
          label={"Flat number,House number"}
          type={"text"}
          error={errorReturn("flatnumber2")}
          onChange={(e) => updateEvent({ flatenumber: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"society"}
          label={"Society, street"}
          type={"text"}
          error={errorReturn("society")}
          onChange={(e) => updateEvent({ society: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"city"}
          label={"City"}
          type={"text"}
          error={errorReturn("city")}
          onChange={(e) => updateEvent({ city: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"state"}
          label={"State"}
          type={"text"}
          error={errorReturn("state")}
          onChange={(e) => updateEvent({ state: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"country"}
          label={"Country"}
          type={"text"}
          error={errorReturn("country")}
          onChange={(e) => updateEvent({ country: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"pincode"}
          label={"Pin code/Zip code"}
          type={"text"}
          error={errorReturn("pincode")}
          onChange={(e) => updateEvent({ pincode: e.target.value })}
        />
      </div>
      <p className="text-xl font-medium ml-4">Kin bank details</p>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"bankName"}
          label={"Bank name"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <InputField
          className="m-4"
          fieldName={"accountHolderName"}
          label={"Account holder name"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <InputField
          className="m-4"
          fieldName={"branchCode"}
          label={"Branch code"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <InputField
          className="m-4"
          fieldName={"accountNumber"}
          label={"Account number"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <InputField
          className="m-4"
          fieldName={"swiftCode"}
          label={"Swift code"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <InputField
          className="m-4"
          fieldName={"ifscCode"}
          label={"IFSC code only for Indians"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <InputField
          className="m-4"
          fieldName={"iban"}
          label={"IBAN.number (Not for indian)"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <InputField
          className="m-4"
          fieldName={"accountType"}
          label={"Types of account"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
      </div>
      <p className="text-xl font-medium ml-4">Wife detail</p>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"name"}
          label={"Name"}
          type={"text"}
          error={errorReturn("name")}
          onChange={(e) => updateEvent({ name: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"dob"}
          label={"Birthdate"}
          type={"date"}
          error={errorReturn("dob")}
          onChange={(e) => updateEvent({ dob: e.target.value })}
        />
        <SelectInput
          className="m-4"
          fieldName={"passport"}
          label={"Passport"}
          type={""}
          onChange={(e) => updateEvent({ passport: e.target.value })}
          error={errorReturn("passport")}
          option={["Yes", "No"]}
        />
        {formEvent.passport === "Yes" && (
          <InputField
            className="m-4"
            fieldName={"passportNumber"}
            label={"Passport number"}
            type={"text"}
            error={errorReturn("passportNumber")}
            onChange={(e) => updateEvent({ passportNumber: e.target.value })}
          />
        )}
        {formEvent.passport === "Yes" && (
          <InputField
            className="m-4"
            fieldName={"dateOfIssues"}
            label={"Date of issue"}
            type={"date"}
            error={errorReturn("dateOfIssues")}
            onChange={(e) => updateEvent({ dateOfIssues: e.target.value })}
          />
        )}{" "}
        {formEvent.passport === "Yes" && (
          <InputField
            className="m-4"
            fieldName={"dateOfExpiry"}
            label={"Date of Expiry"}
            type={"date"}
            error={errorReturn("dateOfExpiry")}
            onChange={(e) => updateEvent({ dateOfExpiry: e.target.value })}
          />
        )}
        <InputField
          className="m-4"
          fieldName={"nameOfChild"}
          label={"Name of child if any"}
          type={"text"}
          error={errorReturn("nameOfChild")}
          onChange={(e) => updateEvent({ nameOfChild: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save & next
      </button>
      <button className="ml-8 text-xl text-blue-700">Clear all</button>
    </form>
  );
};
export default KinDetail;
