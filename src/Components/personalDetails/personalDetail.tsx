import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import { AddPersonalDetail, GetPersonalDetail, UpdatePersonalDetail } from "../../services/user.service";
import InputField from "../../uiComponents/inputField/inputField.component";

import { PersonalDetailValidation, UpdatePersonalDetailValidation } from "./validation";
import SelectInput from "../../uiComponents/inputField/selectInputField.comonent";
import { dobDateValidation } from "../../constants/values.constants";
import { useLocation } from 'react-router-dom';
import ApproveReject from "../../uiComponents/approve_reject";
import { getCrewPersonalDetail } from "../../services/admin.service";

const PersonalDetail = () => {
  const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();
  const [, setFile] = useState(null);
  const { setState } = useContext(PersonalDetailContext)!;

  const [updateData, setUpdateData] = useState<any>({})
  // const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get('id');
 // console.log(id);


    const { crew } = location.state != null ? location.state : {crew:null};
    // console.log(crew);


  async function fetchData() {
    console.log("fetch user data ");
    
    const { data } = id === null ? await GetPersonalDetail() : await getCrewPersonalDetail(id);
    console.log("personal data = ", data);
    let formData = data.data.personaldata;
    console.log("personal formData = ", formData);
    if (formData) {
      console.log("update event ");
      updateEvent(formData)
    
    }
  }

  useEffect(() => {
    console.log("PersonalDetail component 1");
  
    setState(Personalstate.personalDetails);  
     fetchData(); 
  }, []);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };




  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      if (next.isFormChanged) {
        setUpdateData({ ...updateData, ...next})
      }
      console.log(JSON.stringify(next)+"==========================");
      console.log(updateData)
      const newEvent = { ...prev, ...next };
      console.log(newEvent);
      return newEvent;
    },
    {
      firstname:id != null ? crew.firstname ?? "" : "",
      lastname:id != null ? crew.lastname ?? "": "",
      dob: "",
      gender: "male",
      marital_status: "unmarried",
      birthPlace: "",
      nationality: "Indian",
      flatnumber: "",
      society: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      nearest_airport: "",
      isSameAddress: false,
      flatnumber2: "",
      society2: "",
      city2: "",
      state2: "",
      country2: "",
      pincode2: "",
     // nearest_airport2:"",
      aadhaar: "",  
      pan: "",
      CNC:"",
      isFormChanged:false,
      error: { key: "", value: "" },
    }
  );

  const handlerSubmit = async (event: any) => {
    toast.dismiss();
    try {
      dispatch({ type: LOADING, payload: true });
      event.preventDefault();
     

      let formData = formEvent.hasOwnProperty("user_id")? {...updateData} :{ ...formEvent};
      delete formData.error;
      delete formData.isFormChanged
      delete formData.firstname
      delete formData.lastname
      delete formData.user_id
      console.log(JSON.stringify(formData)+"????????????????");
       let isValid = formEvent.hasOwnProperty("user_id") ?  await UpdatePersonalDetailValidation(formData) : await PersonalDetailValidation(formData );
     
      if (isValid) {
        console.log(JSON.stringify(formData));
        delete updateData["isFormChanged"];
        const { data } = formEvent.hasOwnProperty("user_id")? await UpdatePersonalDetail(updateData): await AddPersonalDetail(formData)
        if (data.success) {
          toast.info(data.message)
          navigate("/dashboard/personaldetails/contactDetail");
        }
        //dispatch({ type: LOADING, payload: false });
      } else {
        throw Error(isValid)
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        for (let errorDetail of error.details) {
          updateEvent({
            error: {
              key: errorDetail.context.key,
              values: errorDetail.message,
            },
          });
          console.log(errorDetail.context.key + "======");
          toast.error(errorDetail.message);
        }
      } else if (error.name === "AxiosError")
        toast.error(error.response.data.message);
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };

  const errorReturn = (field: string) =>
    formEvent.error.key === field ? formEvent.error.value : "";

  function clearAllData() {
    updateEvent({
      firstname: "",
      lastname: "",
      dob: "",
      gender: "male",
      marital_status: "unmarried",
      birthPlace: "",
      nationality: "Indian",
      flatnumber: "",
      society: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      nearest_airport: "",
      isSameAddress: false,
      flatnumber2: "",
      society2: "",
      city2: "",
      state2: "",
      country2: "",
      pincode2: "",
      nearest_airport2: "",
      aadhaar: "",  
      pan: "",
      CNC:"",
      error: { key: "", value: "" },
      isFormChanged:false
    });
  }

  return (
    //  <PersonalDetailLayout>
    <form onSubmit={handlerSubmit}>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"firstname"}
          label={"First Name"}
          type={"text"}
          disabled={id !== null ? false :true}
          error={errorReturn("firstname")}
          onChange={(e) => updateEvent({ firstname: e.target.value, isFormChanged:true })}
          value={id !== null ? formEvent.firstname : globalState.data.data.firstname}
        />
        <InputField
          className="m-4"
          fieldName={"lastname"}
          label={"Last Name"}
          type={"text"}
          disabled={id !== null ? false :true}
          error={errorReturn("lastname")}
          onChange={(e) => updateEvent({ lastname: e.target.value, isFormChanged:true })}
          value={id !== null ? formEvent.lastname : globalState.data.data.lastname}
        />
        <InputField
          className="m-4"
          fieldName={"dob"}
          label={"Birthdate"}
          type={"date"}
          max={dobDateValidation}
          error={errorReturn("dob")}
          onChange={(e) => updateEvent({ dob: e.target.value, isFormChanged:true })}
          value={ formEvent.dob.split("T")[0]}
        />
        <SelectInput
          className="m-4"
          fieldName={"gender"}
          label={"Gender"}
          type={""}
          onChange={(e) => updateEvent({ gender: e.target.value, isFormChanged:true })}
          value={ formEvent.gender}
          error={errorReturn("gender")}
          option={["male", "female"]}
        />
        <SelectInput
          className="m-4"
          fieldName={"marital_status"}
          label={"Marital status"}
          type={""}
          error={errorReturn("marital_status")}
          onChange={(e) => updateEvent({ marital_status: e.target.value, isFormChanged:true })}
          value={formEvent.marital_status}
          option={["unmarried","married"]}
        />
        <InputField
          className="m-4"
          fieldName={"birthPlace"}
          label={"Place of birth"}
          type={"text"}
          error={errorReturn("birthPlace")}
          onChange={(e) => updateEvent({ birthPlace: e.target.value, isFormChanged:true })}
          value={ formEvent.birthPlace}
        />
          <SelectInput
          className="m-4"
          fieldName={"nationality"}
          label={"Nationality"}
          type={""}
          error={errorReturn("nationality")}
          onChange={(e) => updateEvent({ nationality: e.target.value, isFormChanged:true })}
          value={ formEvent.nationality}
          option={["Indian", "Pakistani","Ukrainian","Russian"]}
        />
        {/* <InputField
          className="m-4"
          fieldName={"nationality"}
          label={"Nationality"}
          type={"text"}
          error={errorReturn("nationality")}
          onChange={(e) => updateEvent({ nationality: e.target.value, isFormChanged:true })}
          value={formEvent.nationality}
        /> */}
        {id=== null && <InputField
          className="m-4"
          fieldName={"fileNumber"}
          label={"File Number"}
          disabled={true}
          type={"text"}
          error={errorReturn("fileNumber")}
          value={globalState.data.data.userId}
          onChange={() => {}}
        />}
        {/* <InputField
          className="m-4"
          fieldName={"gender"}
          label={"Gender"}
          type={"text"}
          onChange={() => {}}
        /> */}
      </div>
      <p className="text-xl font-medium ml-4">Address</p>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"flatnumber"}
          label={"Flat number,House number"}
          type={"text"}
          error={errorReturn("flatnumber")}
          onChange={(e) => updateEvent({ flatnumber: e.target.value, isFormChanged:true })}
          value={ formEvent.flatnumber}
        />
        <InputField
          className="m-4"
          fieldName={"society"}
          label={"Society, street"}
          type={"text"}
          error={errorReturn("society")}
          onChange={(e) => updateEvent({ society: e.target.value, isFormChanged:true })}
          value={ formEvent.society}
        />
        <InputField
          className="m-4"
          fieldName={"city"}
          label={"City"}
          type={"text"}
          error={errorReturn("city")}
          onChange={(e) => updateEvent({ city: e.target.value, isFormChanged:true })}
          value={ formEvent.city}
        />
        <InputField
          className="m-4"
          fieldName={"state"}
          label={"State"}
          type={"text"}
          error={errorReturn("state")}
          onChange={(e) => updateEvent({ state: e.target.value, isFormChanged:true })}
          value={ formEvent.state}
        />
        <InputField
          className="m-4"
          fieldName={"country"}
          label={"Country"}
          type={"text"}
          error={errorReturn("country")}
          onChange={(e) => updateEvent({ country: e.target.value , isFormChanged:true})}
          value={formEvent.country}
        />
        <InputField
          className="m-4"
          fieldName={"pincode"}
          label={"Pin code/Zip code"}
          type={"text"}
          error={errorReturn("pincode")}
          onChange={(e) => updateEvent({ pincode: e.target.value, isFormChanged:true })}
          value={ formEvent.pincode}
        />
        <InputField
          className="m-4"
          fieldName={"nearest_airport"}
          label={"Nearest airport"}
          type={"text"}
          error={errorReturn("nearest_airport")}
          onChange={(e) => updateEvent({ nearest_airport: e.target.value, isFormChanged:true })}
          value={formEvent.nearest_airport}
        />
      </div>
      <div className="flex mb-3 items-center">
        <label
          htmlFor="checked-checkbox"
          className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Address 2 &nbsp;
        </label>
        <input
          id="checked-checkbox"
          type="checkbox"
          checked={ formEvent.isSameAddress}
          value={formEvent.isSameAddress}
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ isSameAddress: e.target.checked, isFormChanged:true });
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="checked-checkbox"
          className="ml-2  text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Same as above
        </label>
      </div>
      {!formEvent.isSameAddress && (
        <div >
          <p className="ml-4 text-xl font-medium">Address</p>
          <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
              className="m-4"
              fieldName={"flatnumber2"}
              label={"Flat/House number"}
              type={"text"}
              error={errorReturn("flatnumber2")}
              onChange={(e) => updateEvent({ flatnumber2: e.target.value, isFormChanged:true })}
              value={ formEvent.flatnumber2}
            />
            <InputField
              className="m-4"
              fieldName={"society2"}
              label={"Society, street"}
              type={"text"}
              error={errorReturn("society2")}
              onChange={(e) => updateEvent({ society2: e.target.value, isFormChanged:true })}
              value={ formEvent.society2}
            />
            <InputField
              className="m-4"
              fieldName={"city2"}
              label={"City"}
              type={"text"}
              error={errorReturn("city2")}
              onChange={(e) => updateEvent({ city2: e.target.value, isFormChanged:true })}
              value={ formEvent.city2}
            />
            <InputField
              className="m-4"
              fieldName={"state2"}
              label={"State"}
              type={"text"}
              error={errorReturn("state2")}
              onChange={(e) => updateEvent({ state2: e.target.value, isFormChanged:true })}
              value={formEvent.state2}
            />
            <InputField
              className="m-4"
              fieldName={"country2"}
              label={"Country"}
              type={"text"}
              error={errorReturn("country2")}
              onChange={(e) => updateEvent({ country2: e.target.value, isFormChanged:true })}
              value={ formEvent.country2}
            />
            <InputField
              className="m-4"
              fieldName={"pincode2"}
              label={"Pin code/Zip code"}
              type={"text"}
              error={errorReturn("pincode2")}
              onChange={(e) => updateEvent({ pincode2: e.target.value, isFormChanged:true })}
              value={ formEvent.pincode2}
            />
            {/* <InputField
              className="m-4"
              fieldName={"nearest_airport2"}
              label={"Nearest airport"}
              type={"text"}
              error={errorReturn("nearest_airport2")}
              onChange={(e) =>
                updateEvent({ nearest_airport2: e.target.value, isFormChanged:true })
              }
              value={formEvent.nearest_airport2}
            /> */}
          </div>
        </div>
      )}
      {formEvent.nationality === "Pakistani" && <p className="ml-4 text-xl font-medium">Pakistani National ID card detials</p>}
      {formEvent.nationality === "Pakistani" && <div className="grid grid-flow-col grid-cols-2 max-sm:grid-cols">
      <div className="m-3" id="cnc">
          <InputField 
            type="text"
            fieldName="CNC"
            label="CNC"
            className="mb-4"
            error={errorReturn("CNC")}
            onChange={(e) => updateEvent({ CNC: e.target.value, isFormChanged: true })}
            value={ formEvent.CNC}
          />
          <label
            htmlFor="cnc"
            className="btn font-semibold text-xl text-[#3B77BE]"
          >
            <u>upload CNC</u>
          </label></div>
      </div>}
      
      {formEvent.nationality === "Indian" && <p className="ml-4 text-xl font-medium">National ID card detials</p>}
      {/* <p className="ml-4 text-base text-[#A0A0A0]">Only for Indian resident </p> */}
     {formEvent.nationality === "Indian" && <div  className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1">
        <div className="m-3">
          <InputField
            type="text"
            fieldName="aadhaar"
            label="Aadhar number"
            className="mb-4"
            error={errorReturn("aadhaar")}
            onChange={(e) => updateEvent({ aadhaar: e.target.value, isFormChanged: true })}
            value={formEvent.aadhaar}
          />
          <label
            htmlFor="aadharFile"
            className="btn font-semibold text-lg text-[#3B77BE]"
          >
            <u>upload Aadhar</u>
          </label>
          <input
            className="hidden"
            id="aadharFile"
            type="file"
            onChange={handleFileChange}
            name="upload Aadhar"
          />
        </div>
        <div className="m-3">
          <InputField
            type="text"
            fieldName="pan"
            label="Pan card"
            className="mb-4"
            error={errorReturn("pan")}
            onChange={(e) => updateEvent({ pan: e.target.value, isFormChanged: true })}
            value={ formEvent.pan}
            
          />
          <label
            htmlFor="panFile"
            className="btn font-semibold text-lg text-[#3B77BE]"
          >
            <u>upload Pan card</u>
          </label>
          <input
            className="hidden"
            id="panFile"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>}
     {id===null && <div>
        
{formEvent.isFormChanged ?  <button
    type="submit"
    className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Save & next
  </button> :
  <button
    type="button"
    className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    onClick={() => {
      // clearAllData();
      navigate("/dashboard/personaldetails/contactDetail");
    }}
  >
    Skip and Next
  </button>}
      <button
        type="button"
        onClick={clearAllData}
        className="ml-8 text-xl text-blue-700"
      >
        Clear all
      </button>
      </div>}

      {id!== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{}}>Save</button> }
      
     {id!== null && !formEvent.isFormChanged &&  <div id="approver">
        <ApproveReject name="personalDetail" navigation={`/adminDashboard/personaldetails/contactDetail/?id=${id}`} locationStateData={crew} doc_id="PersonalDetail" user_id={id} />
      </div>}
    </form>
    // </PersonalDetailLayout>
  );
};
export default PersonalDetail;
