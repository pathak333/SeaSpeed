import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import { AddPersonalDetail, GetPersonalDetail } from "../../services/user.service";
import InputField from "../inputField/inputField.component";
import SelectInput from "../inputField/selectInputField.comonent";
import { PersonalDetailValidation } from "./validation";

const PersonalDetail = () => {
  const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();
  const [file, setFile] = useState(null);
  const { setState } = useContext(PersonalDetailContext)!;

  async function fetchData() {
    const { data } = await GetPersonalDetail();
    console.log("personal data = ", data);
    let formData = data.data.personaldata;
    console.log("personal formData = ", formData);
    if (formData) {
      console.log("update event ");
      updateEvent({
        firstname: "",
        lastname: "",
        dob: formData.dob,
        gender: formData.gender,
        marital_status: formData.marital_status,
        birthPlace: formData.birthPlace,
        nationality: formData.nationality,
        flatnumber: formData.flatnumber,
        society: formData.society,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        nearest_airport: formData.nearest_airport,
        isSameAddress: formData.isSameAddress,
        isFormChanged:false
      });
    }
  }

  useEffect(() => {
    setState(Personalstate.personalDetails);
    fetchData();
    console.log("PersonalDetail component 1");
  }, []);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      console.log(newEvent);

      return newEvent;
    },
    {
      firstname: "",
      lastname: "",
      dob: "",
      gender: "male",
      marital_status: "Single",
      birthPlace: "",
      nationality: "",
      flatnumber: "",
      society: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      nearest_airport: "",
      isSameAddress: false,
       isFormChanged:true,
      error: { key: "", value: "" },
    }
  );

  const handlerSubmit = async (event: any) => {
    toast.dismiss();
    try {
      dispatch({ type: LOADING, payload: true });
      event.preventDefault();
      let formData = { ...formEvent };
      delete formData.error;
      delete formData.isFormChanged
       let isValid = await PersonalDetailValidation(formData );
     
      if (isValid) {
        console.log(formData);
        const { data } = await AddPersonalDetail(formData)
        if (data.success) {
          navigate("/dashboard/personaldetails/contactDetail");
        }
        dispatch({ type: LOADING, payload: false });
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
      marital_status: "Single",
      birthPlace: "",
      nationality: "",
      flatnumber: "",
      society: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      nearest_airport: "",
      isSameAddress: false,
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
          disabled={true}
          error={errorReturn("firstname")}
          onChange={(e) => updateEvent({ firstname: e.target.value, isFormChanged:true })}
          value={globalState.data.data.firstname}
        />
        <InputField
          className="m-4"
          fieldName={"lastname"}
          label={"Last Name"}
          type={"text"}
          disabled={true}
          error={errorReturn("lastname")}
          onChange={(e) => updateEvent({ lastname: e.target.value, isFormChanged:true })}
          value={globalState.data.data.lastname}
        />
        <InputField
          className="m-4"
          fieldName={"dob"}
          label={"Birthdate"}
          type={"date"}
          error={errorReturn("dob")}
          onChange={(e) => updateEvent({ dob: e.target.value, isFormChanged:true })}
          value={formEvent.dob}
        />
        <SelectInput
          className="m-4"
          fieldName={"gender"}
          label={"Gender"}
          type={""}
          onChange={(e) => updateEvent({ gender: e.target.value, isFormChanged:true })}
          value={formEvent.gender}
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
          option={["Single", "Married"]}
        />
        <InputField
          className="m-4"
          fieldName={"birthPlace"}
          label={"Place of birth"}
          type={"text"}
          error={errorReturn("birthPlace")}
          onChange={(e) => updateEvent({ birthPlace: e.target.value, isFormChanged:true })}
          value={formEvent.birthPlace}
        />
        <InputField
          className="m-4"
          fieldName={"nationality"}
          label={"Nationality"}
          type={"text"}
          error={errorReturn("nationality")}
          onChange={(e) => updateEvent({ nationality: e.target.value, isFormChanged:true })}
          value={formEvent.nationality}
        />
        <InputField
          className="m-4"
          fieldName={"fileNumber"}
          label={"File Number"}
          disabled={true}
          type={"text"}
          error={errorReturn("fileNumber")}
          value={globalState.data.data.userId}
          onChange={() => {}}
        />
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
          value={formEvent.flatnumber}
        />
        <InputField
          className="m-4"
          fieldName={"society"}
          label={"Society, street"}
          type={"text"}
          error={errorReturn("society")}
          onChange={(e) => updateEvent({ society: e.target.value, isFormChanged:true })}
          value={formEvent.society}
        />
        <InputField
          className="m-4"
          fieldName={"city"}
          label={"City"}
          type={"text"}
          error={errorReturn("city")}
          onChange={(e) => updateEvent({ city: e.target.value, isFormChanged:true })}
          value={formEvent.city}
        />
        <InputField
          className="m-4"
          fieldName={"state"}
          label={"State"}
          type={"text"}
          error={errorReturn("state")}
          onChange={(e) => updateEvent({ state: e.target.value, isFormChanged:true })}
          value={formEvent.state}
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
          value={formEvent.pincode}
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
      <div className="flex items-center">
        <label
          htmlFor="checked-checkbox"
          className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Address 2 &nbsp;
        </label>
        <input
          id="checked-checkbox"
          type="checkbox"
          checked={formEvent.isSameAddress}
          value={formEvent.isSameAddress}
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ isSameAddress: e.target.checked, isFormChanged:true });
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="checked-checkbox"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Same as above
        </label>
      </div>
      {!formEvent.isSameAddress && (
        <div>
          <p className="ml-4 text-xl font-medium">Address</p>
          <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
              className="m-4"
              fieldName={"flatnumber2"}
              label={"Flat number,House number"}
              type={"text"}
              error={errorReturn("flatnumber2")}
              onChange={(e) => updateEvent({ flatenumber2: e.target.value, isFormChanged:true })}
              value={formEvent.flatnumber2}
            />
            <InputField
              className="m-4"
              fieldName={"society2"}
              label={"Society, street"}
              type={"text"}
              error={errorReturn("society2")}
              onChange={(e) => updateEvent({ society2: e.target.value, isFormChanged:true })}
              value={formEvent.society2}
            />
            <InputField
              className="m-4"
              fieldName={"city2"}
              label={"City"}
              type={"text"}
              error={errorReturn("city2")}
              onChange={(e) => updateEvent({ city2: e.target.value, isFormChanged:true })}
              value={formEvent.city2}
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
              value={formEvent.country2}
            />
            <InputField
              className="m-4"
              fieldName={"pincode2"}
              label={"Pin code/Zip code"}
              type={"text"}
              error={errorReturn("pincode2")}
              onChange={(e) => updateEvent({ pincode2: e.target.value, isFormChanged:true })}
              value={formEvent.pincode2}
            />
            <InputField
              className="m-4"
              fieldName={"nearest_airport2"}
              label={"Nearest airport"}
              type={"text"}
              error={errorReturn("nearest_airport2")}
              onChange={(e) =>
                updateEvent({ nearest_airport2: e.target.value, isFormChanged:true })
              }
              value={formEvent.nearest_airport2}
            />
          </div>
        </div>
      )}
      <p className="ml-4 text-xl font-medium">National ID card detials</p>
      {/* <p className="ml-4 text-base text-[#A0A0A0]">Only for Indian resident </p> */}
      <div className="grid grid-flow-col grid-cols-2 max-sm:grid-cols-1">
        <div className="m-3">
          <InputField
            type="text"
            fieldName="aadhar"
            label="Aadhar number"
            className="mb-4"
            error={errorReturn("aadhar")}
            onChange={(e) => updateEvent({ aadhar: e.target.value })}
          />
          <label
            htmlFor="aadharFile"
            className="btn font-semibold text-xl text-[#3B77BE]"
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
            fieldName="pancard"
            label="Pan card"
            className="mb-4"
            error={errorReturn("pancard")}
            onChange={(e) => updateEvent({ pancard: e.target.value })}
          />
          <label
            htmlFor="panFile"
            className="btn font-semibold text-xl text-[#3B77BE]"
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
      </div>

{formEvent.isFormChanged ?  <button
    type="submit"
    className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Save & next
  </button> :
  <button
    type="button"
    className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
    </form>
    // </PersonalDetailLayout>
  );
};
export default PersonalDetail;
