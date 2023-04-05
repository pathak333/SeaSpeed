import { useReducer } from "react";
import InputField from "../inputField/inputField.component";
import SelectInput from "../inputField/selectInputField.comonent";
import { Upload } from "react-feather";
import { useNavigate } from "react-router-dom";

const PassPortDetail = (props: any) => {
  const navigate = useNavigate();
  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      passportNumber: "",
      placeOfIssue: "",
      dateOfIssue: "",
      dateOfExpiry: "",
      ECNR: "",

      error: { key: "", value: "" },
    }
  );

  function clearAllData() {}

  const errorReturn = (field: string) =>
    formEvent.error.key === field ? formEvent.error.value : "";

  return (
    <form>
      <h3 className="pl-4 font-semibold">Passport Detail</h3>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"passportNumber"}
          label={"Passport Number"}
          type={"text"}
          disabled={true}
          error={errorReturn("passportNumber")}
          onChange={(e) => updateEvent({ passportNumber: e.target.value })}
          value={formEvent.passportNumber}
        />
        <InputField
          className="m-4"
          fieldName={"placeOfIssue"}
          label={"Place of issue"}
          type={"text"}
          disabled={true}
          error={errorReturn("placeOfIssue")}
          onChange={(e) => updateEvent({ placeOfIssue: e.target.value })}
          value={formEvent.placeOfIssue}
        />
        <InputField
          className="m-4"
          fieldName={"dateOfIssue"}
          label={"Date of issue"}
          type={"date"}
          error={errorReturn("dateOfIssue")}
          onChange={(e) => updateEvent({ dateOfIssue: e.target.value })}
          value={formEvent.dateOfIssue}
        />
        <InputField
          className="m-4"
          fieldName={"dateOfExpiry"}
          label={"Date of expiry"}
          type={"date"}
          error={errorReturn("dateOfExpiry")}
          onChange={(e) => updateEvent({ dateOfExpiry: e.target.value })}
          value={formEvent.dateOfExpiry}
        />
        <SelectInput
          className="m-4"
          fieldName={"ECNR"}
          label={"ECNR"}
          type={""}
          onChange={(e) => updateEvent({ ECNR: e.target.value })}
          value={formEvent.ECNR}
          error={errorReturn("ECNR")}
          option={["Yes", "No"]}
        />

        <div>
          <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
            <Upload className="text-IbColor" />
            <p className="text-IbColor">Upload Passport PDF</p>
          </div>

          <ul className="list-disc ml-4">
            <li className="text-textGrey text-sm ml-3">
              Your passport should have minimum 3 blank pages
            </li>
            <li className="text-textGrey text-sm ml-3">
              The passport being uploaded needs to have an expiration date of at
              least a year or more from this day.
            </li>
          </ul>
        </div>
      </div>
      <div className="m-3">
        <button
          type="button"
          onClick={() => {
            navigate("/dashboard/traveldetails/visadetail");
          }}
          className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save & next
        </button>
        <button
          type="button"
          onClick={clearAllData}
          className="ml-8 text-xl text-blue-700"
        >
          Clear all
        </button>
      </div>
    </form>
  );
};

export default PassPortDetail;
