import { useContext, useEffect, useReducer } from "react";
import InputField from "../inputField/inputField.component";
import { Upload } from "react-feather";
import { useNavigate } from "react-router-dom";
import { TravelDetailContext, TravelState } from "../../contexts/travelDetail.context";

const VisaDetail = (props: any) => {
  const { setState } = useContext(TravelDetailContext)!;
  useEffect(() => {
    
    setState(TravelState.visa);
    
  }, [])
  

  const navigate = useNavigate();


  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      let newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      haveNoVisa: false,
      haveNoUsVisa: false,
      visatype: "",
      placeOfIssue: "",
      number: "",
      dateOfIssue: "",
      dateOfExpiry: "",
      us_placeOfIssue: "",
      us_number: "",
      us_dateOfIssue: "",
      us_dateOfExpiry: "",
      error: { key: "", value: "" },
      isFormChanged:false
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
            updateEvent({ haveNoVisa: e.target.checked, isFormChanged:true});
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
          disabled={formEvent.haveNoVisa}
          error={errorReturn("visatype")}
          onChange={(e) => updateEvent({ visatype: e.target.value, isFormChanged:true })}
          value={formEvent.visatype}
        />
        <InputField
          className="m-4"
          fieldName={"placeOfIssue"}
          label={"Place of issue"}
          type={"text"}
          disabled={formEvent.haveNoVisa}
          error={errorReturn("placeOfIssue")}
          onChange={(e) => updateEvent({ placeOfIssue: e.target.value, isFormChanged:true })}
          value={formEvent.placeOfIssue}
        />
        <InputField
          className="m-4"
          fieldName={"number"}
          label={"Number"}
          type={"text"}
          disabled={formEvent.haveNoVisa}
          error={errorReturn("number")}
          onChange={(e) => updateEvent({ number: e.target.value, isFormChanged:true })}
          value={formEvent.number}
        />
        <InputField
          className="m-4"
          fieldName={"dateOfIssue"}
          label={"Date of issue"}
          disabled={formEvent.haveNoVisa}
          type={"date"}
          error={errorReturn("dateOfIssue")}
          onChange={(e) => updateEvent({ dateOfIssue: e.target.value, isFormChanged:true })}
          value={formEvent.dateOfIssue}
        />
        <InputField
          className="m-4"
          fieldName={"dateOfExpiry"}
          label={"Date of expiry"}
          disabled={formEvent.haveNoVisa}
          type={"date"}
          error={errorReturn("dateOfExpiry")}
          onChange={(e) => updateEvent({ dateOfExpiry: e.target.value, isFormChanged:true })}
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
          checked={formEvent.haveNoUsVisa}
          value={formEvent.haveNoUsVisa}
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ haveNoUsVisa: e.target.checked, isFormChanged:true });
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
          fieldName={"us_placeOfIssue"}
          label={"Place of issue"}
          type={"text"}
          disabled={formEvent.haveNoUsVisa}
          error={errorReturn("us_placeOfIssue")}
          onChange={(e) => updateEvent({ us_placeOfIssue: e.target.value, isFormChanged:true })}
          value={formEvent.us_placeOfIssue}
        />
        <InputField
          className="m-4"
          fieldName={"us_number"}
          label={"Number"}
          type={"text"}
          disabled={formEvent.haveNoUsVisa}
          error={errorReturn("us_number")}
          onChange={(e) => updateEvent({ us_number: e.target.value, isFormChanged:true })}
          value={formEvent.us_number}
        />
        <InputField
          className="m-4"
          fieldName={"us_us_dateOfIssue"}
          label={"Date of issue"}
          disabled={formEvent.haveNoUsVisa}
          type={"date"}
          error={errorReturn("us_us_dateOfIssue")}
          onChange={(e) => updateEvent({ us_us_dateOfIssue: e.target.value, isFormChanged:true })}
          value={formEvent.us_us_dateOfIssue}
        />
        <InputField
          className="m-4"
          fieldName={"us_dateOfExpiry"}
          label={"Date of expiry"}
          disabled={formEvent.haveNoUsVisa}
          type={"date"}
          error={errorReturn("us_dateOfExpiry")}
          onChange={(e) => updateEvent({ us_dateOfExpiry: e.target.value, isFormChanged:true })}
          value={formEvent.us_dateOfExpiry}
        />
      </div>
      <button
          className="ml-8 text-xl text-gray-500"
          onClick={() => navigate("/dashboard/traveldetails")}
        >
          Previous
        </button>
      {formEvent.isFormChanged  ? <button
        type="submit"
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save & next
      </button>:
      <button
        type="button"
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          
          navigate("/dashboard/traveldetails/SeaMenBookdetail");
        }}
      >
        Skip and Next
      </button>}
      <button
          type="button"
          className="ml-8 text-xl text-blue-700"
          onClick={() => {
            //clearAllData();
            updateEvent({ dataList: [] });
          }}
        >
          Clear all
        </button>
      
    </form>
  );
};

export default VisaDetail;
