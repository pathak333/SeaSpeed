import { useContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import { GetKinDetail, KinDetailService, UpdateKinDetailService } from "../../services/user.service";

import { KinDetailValidation } from "./validation";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import { ExpireformattedDateFormNow, IssuesformattedDate } from "../../constants/values.constants";

import InputField from "../../uiComponents/inputField/inputField.component";
import SelectInput from "../../uiComponents/inputField/selectInputField.comonent";
import ApproveReject from "../../uiComponents/approve_reject";
import { getCrewKinDetail } from "../../services/admin.service";

const KinDetail = () => {

 const [globalState, dispatch] = useGlobalState();
  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');



  const navigate = useNavigate();
  const { setState } = useContext(PersonalDetailContext)!;


  async function fetchData() {
    const { data } = id === null ? await GetKinDetail() : await getCrewKinDetail(id)
    console.log(data)
    if (data.success && data.data) {
      console.log("data inter")
      updateEvent(data.data)
    }
}



  useEffect(() => {
    fetchData();
    setState(Personalstate.kinDetails);
  }, []);

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      fullName: "",
      relationship: "",
     // code: "",
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
        passport: "Yes",
        passportNumber: "",
        dateOfIssues: "",
        dateOfExpiry: "",
        nameOfChild: "",
      },
      isFormChanged:false,
      error: { keys: "", values: "" },
    }
  );

  const clearAllData = () => {
   
    updateEvent({
      fullName: "",
      relationship: "",
     // code: "",
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
        passport: "Yes",
        passportNumber: "",
        dateOfIssues: "",
        dateOfExpiry: "",
        nameOfChild: "",
      },
      isFormChanged:false,
      error: { keys: "", values: "" },
    });
  };


  const handlerSubmit = async (event: any) => {
    toast.dismiss();
    event.preventDefault();
    try {
      let formData = { ...formEvent };
      delete formData.error;
      delete formData.isFormChanged;
      if (formData.hasOwnProperty('_id')) {
        delete formData._id;
        delete formData.user_id;
        delete formData.createdAt;
        delete formData.updatedAt;
     }
      console.log(formData);

      const isValid = await KinDetailValidation(formData);
      if (isValid) {
        const { data } =formEvent.hasOwnProperty("user_id") ? await UpdateKinDetailService(formData) : await KinDetailService(formData);
        if (data.success) {
          toast.info(data.message)
          navigate("/dashboard/traveldetails");
        }
      } else {
        throw Error(isValid);
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        for (let errorDetail of error.details) {
          updateEvent({
            error: {
              keys: errorDetail.context.key,
              values: errorDetail.message,
            },
          });
          toast.error(errorDetail.message);
        }
      } else if (error.name === "AxiosError") {
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };

  const errorReturn = (field: string) =>
    formEvent.error.keys === field ? formEvent.error.values : "";

  return (
    <form onSubmit={handlerSubmit}>
      <h3 className="ml-4 font-semibold">Kin details</h3>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"fullName"}
          label={"Full name"}
          type={"text"}
          error={errorReturn("fullName")}
          onChange={(e) => updateEvent({ fullName: e.target.value, isFormChanged: true })}
          value={formEvent.fullName}
        />
        <InputField
          className="m-4"
          fieldName={"relationship"}
          label={"Relationship"}
          type={"text"}
          error={errorReturn("relationship")}
          onChange={(e) => updateEvent({ relationship: e.target.value,isFormChanged:true })}
          value={formEvent.relationship}
        />
        <div className="flex flex-row">
          {/* <InputField
            className="m-4 w-28"
            inputClass="pr-1"
            fieldName={"code"}
            label={"Code"}
            type={"text"}
            error={errorReturn("code")}
            onChange={(e) => updateEvent({ code: e.target.value,isFormChanged:true })}
          value={formEvent.code}
          /> */}
          <InputField
            className="m-4 w-full"
            fieldName={"phoneNumber"}
            label={"Phone number"}
            type={"number"}
            error={errorReturn("phoneNumber")}
            onChange={(e) => updateEvent({ phoneNumber: e.target.value,isFormChanged:true })}
          value={formEvent.phoneNumber}
          />
        </div>
        <InputField
          className="m-4"
          fieldName={"email"}
          label={"Email"}
          type={"text"}
          error={errorReturn("email")}
          onChange={(e) => updateEvent({ email: e.target.value,isFormChanged:true })}
          value={formEvent.email}
        />
      </div>
      <p className="text-xl font-medium ml-4">Kin address details</p>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"flatnumber"}
          label={"Flat number,House number"}
          type={"text"}
          error={errorReturn("flatnumber")}
          onChange={(e) => updateEvent({ flatnumber: e.target.value,isFormChanged:true })}
          value={formEvent.flatnumber}
        />
        <InputField
          className="m-4"
          fieldName={"society"}
          label={"Society, street"}
          type={"text"}
          error={errorReturn("society")}
          onChange={(e) => updateEvent({ society: e.target.value,isFormChanged:true })}
          value={formEvent.society}
        />
        <InputField
          className="m-4"
          fieldName={"city"}
          label={"City"}
          type={"text"}
          error={errorReturn("city")}
          onChange={(e) => updateEvent({ city: e.target.value,isFormChanged:true })}
          value={formEvent.city}
        />
        <InputField
          className="m-4"
          fieldName={"state"}
          label={"State"}
          type={"text"}
          error={errorReturn("state")}
          onChange={(e) => updateEvent({ state: e.target.value,isFormChanged:true })}
          value={formEvent.state}
        />
        <InputField
          className="m-4"
          fieldName={"country"}
          label={"Country"}
          type={"text"}
          error={errorReturn("country")}
          onChange={(e) => updateEvent({ country: e.target.value,isFormChanged:true })}
          value={formEvent.country}
        />
        <InputField
          className="m-4"
          fieldName={"pincode"}
          label={"Pin code/Zip code"}
          type={"text"}
          error={errorReturn("pincode")}
          onChange={(e) => updateEvent({ pincode: e.target.value,isFormChanged:true })}
          value={formEvent.pincode}
        />
      </div>
      <p className="text-xl font-medium ml-4">Kin bank details</p>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"bankName"}
          label={"Bank name"}
          type={"text"}
          error={errorReturn("bankName")}
          onChange={(e) => updateEvent({ bankName: e.target.value,isFormChanged:true })}
          value={formEvent.bankName}
        />
        <InputField
          className="m-4"
          fieldName={"accountHolderName"}
          label={"Account holder name"}
          type={"text"}
          error={errorReturn("accountHolderName")}
          onChange={(e) => updateEvent({ accountHolderName: e.target.value,isFormChanged:true })}
          value={formEvent.accountHolderName}
        />
        <InputField
          className="m-4"
          fieldName={"branchCode"}
          label={"Branch code"}
          type={"text"}
          error={errorReturn("branchCode")}
          onChange={(e) => updateEvent({ branchCode: e.target.value,isFormChanged:true })}
          value={formEvent.branchCode}
        />
        <InputField
          className="m-4"
          fieldName={"accountNumber"}
          label={"Account number"}
          type={"text"}
          error={errorReturn("accountNumber")}
          onChange={(e) => updateEvent({ accountNumber: e.target.value,isFormChanged:true })}
          value={formEvent.accountNumber}
        />
        <InputField
          className="m-4"
          fieldName={"swiftCode"}
          label={"Swift code"}
          type={"text"}
          error={errorReturn("swiftCode")}
          onChange={(e) => updateEvent({ swiftCode: e.target.value,isFormChanged:true })}
          value={formEvent.swiftCode}
        />
        <InputField
          className="m-4"
          fieldName={"ifscCode"}
          label={"IFSC code only for Indians"}
          type={"text"}
          error={errorReturn("ifscCode")}
          onChange={(e) => updateEvent({ ifscCode: e.target.value,isFormChanged:true })}
          value={formEvent.ifscCode}
        />
        <InputField
          className="m-4"
          fieldName={"iban"}
          label={"IBAN.number (Not for indian)"}
          type={"text"}
          error={errorReturn("iban")}
          onChange={(e) => updateEvent({ iban: e.target.value,isFormChanged:true })}
          value={formEvent.iban}
        />
        <InputField
          className="m-4"
          fieldName={"accountType"}
          label={"Types of account"}
          type={"text"}
          error={errorReturn("accountType")}
          onChange={(e) => updateEvent({ accountType: e.target.value,isFormChanged:true })}
          value={formEvent.accountType}
        />
      </div>
     {globalState.data.data.personalDetails.length >0 && globalState.data.data.personalDetails[0].marital_status === "married" && <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
      <p className="text-xl font-medium ml-4">Wife detail</p>
        <InputField
          className="m-4"
          fieldName={"name"}
          label={"Name"}
          type={"text"}
          error={errorReturn("name")}
          onChange={(e) => updateEvent({ wifeDetail: {
            ...formEvent.wifeDetail,
            name: e.target.value
          },isFormChanged:true })}
          value={formEvent.wifeDetail.name}
        />
        <InputField
          className="m-4"
          fieldName={"dob"}
          label={"Birthdate"}
          type={"date"}
          max={IssuesformattedDate}
          error={errorReturn("dob")}
          onChange={(e) => updateEvent({ wifeDetail: {
            ...formEvent.wifeDetail,
            dob: e.target.value
          },isFormChanged:true})}
          value={formEvent.wifeDetail.dob}
        />
        <SelectInput
          className="m-4"
          fieldName={"passport"}
          label={"Passport"}
          type={""}
          onChange={(e) => updateEvent({wifeDetail: {
            ...formEvent.wifeDetail,
            passport: e.target.value
          },isFormChanged:true })}
          error={errorReturn("passport")}
          option={["Yes", "No"]}
          value={formEvent.wifeDetail.passport}
        />
        {formEvent.wifeDetail.passport === "Yes" && (
          <InputField
            className="m-4"
            fieldName={"passportNumber"}
            label={"Passport number"}
            type={"text"}
            error={errorReturn("passportNumber")}
            onChange={(e) => updateEvent({ wifeDetail: {
              ...formEvent.wifeDetail,
              passportNumber: e.target.value
            } ,isFormChanged:true })}
          value={formEvent.wifeDetail.passportNumber}
          />
        )}
        {formEvent.wifeDetail.passport === "Yes" && (
          <InputField
            className="m-4"
            fieldName={"dateOfIssues"}
            label={"Date of issue"}
            type={"date"}
          max={IssuesformattedDate}
            error={errorReturn("dateOfIssues")}
            onChange={(e) => updateEvent({ wifeDetail: {
              ...formEvent.wifeDetail,
              dateOfIssues: e.target.value
            },isFormChanged:true })}
          value={formEvent.wifeDetail.dateOfIssues}
          />
        )}{" "}
        {formEvent.wifeDetail.passport === "Yes" && (
          <InputField
            className="m-4"
            fieldName={"dateOfExpiry"}
            label={"Date of Expiry"}
            type={"date"}
            min={ExpireformattedDateFormNow}
            error={errorReturn("dateOfExpiry")}
            onChange={(e) => updateEvent({ wifeDetail: {
              ...formEvent.wifeDetail,
              dateOfExpiry: e.target.value
            },isFormChanged:true })}
          value={formEvent.wifeDetail.dateOfExpiry}
          />
        )}
        <InputField
          className="m-4"
          fieldName={"nameOfChild"}
          label={"Name of child if any"}
          type={"text"}
          error={errorReturn("nameOfChild")}
          onChange={(e) => updateEvent({wifeDetail: {
            ...formEvent.wifeDetail,
            nameOfChild: e.target.value
          },isFormChanged:true })}
          value={formEvent.wifeDetail.nameOfChild}
        />
      </div>}
      {
      id === null &&  <div>
            <button
          className="ml-8 text-xl text-gray-500"
          onClick={() => navigate("/dashboard/personaldetails/bankDetail")}
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
          
          navigate("/dashboard/traveldetails");
        }}
      >
        Skip and Next
      </button>}
      <button type="button" onClick={  ()=>clearAllData()} className="ml-8 text-xl text-blue-700">Clear all</button>
        </div>

      }
      { globalState.data.data.permission.includes("application") && 
        <div>
        {id!== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{}}>Save</button> }
      
      {id!== null && !formEvent.isFormChanged &&  <div id="approver">
         <ApproveReject name="kindetails" navigation={`/adminDashboard/traveldetails/?id=${id}`} locationStateData={{}}  doc_id="KinDetail" user_id={id}/>
       </div>}
      </div>}
      { (globalState.data.data.permission.includes("admin") || ("vessel")) && id !== null &&
        <div>
           <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/traveldetails/?id=${id}`);
            }}
          >
           Next
          </button>
      </div> }
    </form>
  );
};
export default KinDetail;
