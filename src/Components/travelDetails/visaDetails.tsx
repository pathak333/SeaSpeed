import { useReducer } from "react";
import InputField from "../inputField/inputField.component";
import { Upload } from "react-feather";

const VisaDetail = (props: any) => {
  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      let newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      haveNoVisa: false,
      visatype: "",
      placeOfIssue: "",
      number: "",
      dateOfIssue: "",
      dateOfExpiry: "",
      error: { key: "", value: "" },
    }
  );

  const errorReturn = (field: string) =>
    formEvent.error.key === field ? formEvent.error.value : "";

  return (
    <form>
      <div className="flex flex-row items-center">
        <h3 className="pl-4 font-semibold mr-2">Visa details</h3>
        <input
          id="haveNoVisa"
          type="checkbox"
          checked={formEvent.haveNoVisa}
          value={formEvent.haveNoVisa}
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ haveNoVisa: e.target.checked });
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="ml-2" htmlFor="haveNoVisa">
          {" "}
          i don't have a visa
        </label>
      </div>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"visatype"}
          label={"Visa type"}
          type={"text"}
          disabled={true}
          error={errorReturn("visatype")}
          onChange={(e) => updateEvent({ visatype: e.target.value })}
          value={formEvent.visatype}
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
          fieldName={"number"}
          label={"Number"}
          type={"text"}
          disabled={true}
          error={errorReturn("number")}
          onChange={(e) => updateEvent({ number: e.target.value })}
          value={formEvent.number}
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
        <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
          <Upload className="text-IbColor" />
          <p className="text-IbColor">Upload Visa PDF</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <h3 className="pl-4 font-semibold mr-2">US visa type </h3>
        <input
          id="haveNoVisa"
          type="checkbox"
          checked={formEvent.haveNoVisa}
          value={formEvent.haveNoVisa}
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ haveNoVisa: e.target.checked });
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="ml-2" htmlFor="haveNoVisa">
          {" "}
          i don't have a visa
        </label>
      </div>
    </form>
  );
};

export default VisaDetail;
