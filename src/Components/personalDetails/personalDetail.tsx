import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import InputField from "../inputField/inputField.component";
import SelectInput from "../inputField/selectInputField.comonent";

const PersonalDetail = () => {
  const navigate = useNavigate();
  const [, dispatch] = useGlobalState();
  const [file, setFile] = useState(null);
  const { setState } = useContext(PersonalDetailContext)!;
  useEffect(() => {
    setState(Personalstate.personalDetails);
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
      error: { keys: "", values: "" },
    }
  );

  const handlerSubmit = async (event: any) => {
    toast.dismiss();
    try {
      dispatch({ type: LOADING, payload: true });
      event.preventDefault();
      let formData = { ...formEvent };
      delete formData.error;
      // let isValid = await PersonalDetailValidation({ ...formData });
      navigate("/dashboard/personaldetails/contactDetail");
      // if (isValid) {
      //   console.log(formData);
      //   dispatch({ type: LOADING, payload: false });
      // }
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
    formEvent.error.keys === field ? formEvent.error.values : "";

  return (
    //  <PersonalDetailLayout>
    <form onSubmit={handlerSubmit}>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"firstname"}
          label={"First Name"}
          type={"text"}
          error={errorReturn("firstname")}
          onChange={(e) => updateEvent({ firstname: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"lastname"}
          label={"Last Name"}
          type={"text"}
          error={errorReturn("lastname")}
          onChange={(e) => updateEvent({ lastname: e.target.value })}
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
          fieldName={"gender"}
          label={"Gender"}
          type={""}
          onChange={(e) => updateEvent({ gender: e.target.value })}
          error={errorReturn("gender")}
          option={["male", "female"]}
        />
        <SelectInput
          className="m-4"
          fieldName={"marital_status"}
          label={"Marital status"}
          type={""}
          error={errorReturn("marital_status")}
          onChange={(e) => updateEvent({ marital_status: e.target.value })}
          option={["Single", "Married"]}
        />
        <InputField
          className="m-4"
          fieldName={"birthPlace"}
          label={"Place of birth"}
          type={"text"}
          error={errorReturn("birthPlace")}
          onChange={(e) => updateEvent({ flatenumber: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"nationality"}
          label={"Nationality"}
          type={"text"}
          error={errorReturn("nationality")}
          onChange={(e) => updateEvent({ flatenumber: e.target.value })}
        />
        <InputField
          className="m-4"
          fieldName={"fileNumber"}
          label={"File Number"}
          disabled={true}
          type={"text"}
          error={errorReturn("nationality")}
          onChange={(e) => updateEvent({ flatenumber: e.target.value })}
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
        <InputField
          className="m-4"
          fieldName={"nearest_airport"}
          label={"Nearest airport"}
          type={"text"}
          error={errorReturn("nearest_airport")}
          onChange={(e) => updateEvent({ nearest_airport: e.target.value })}
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
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ isSameAddress: e.target.checked });
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
              onChange={(e) => updateEvent({ flatenumber2: e.target.value })}
            />
            <InputField
              className="m-4"
              fieldName={"society2"}
              label={"Society, street"}
              type={"text"}
              error={errorReturn("society2")}
              onChange={(e) => updateEvent({ society2: e.target.value })}
            />
            <InputField
              className="m-4"
              fieldName={"city2"}
              label={"City"}
              type={"text"}
              error={errorReturn("city2")}
              onChange={(e) => updateEvent({ city2: e.target.value })}
            />
            <InputField
              className="m-4"
              fieldName={"state2"}
              label={"State"}
              type={"text"}
              error={errorReturn("state2")}
              onChange={(e) => updateEvent({ state2: e.target.value })}
            />
            <InputField
              className="m-4"
              fieldName={"country2"}
              label={"Country"}
              type={"text"}
              error={errorReturn("country2")}
              onChange={(e) => updateEvent({ country2: e.target.value })}
            />
            <InputField
              className="m-4"
              fieldName={"pincode2"}
              label={"Pin code/Zip code"}
              type={"text"}
              error={errorReturn("pincode2")}
              onChange={(e) => updateEvent({ pincode2: e.target.value })}
            />
            <InputField
              className="m-4"
              fieldName={"nearest_airport2"}
              label={"Nearest airport"}
              type={"text"}
              error={errorReturn("nearest_airport2")}
              onChange={(e) =>
                updateEvent({ nearest_airport2: e.target.value })
              }
            />
          </div>
        </div>
      )}
      <p className="ml-4 text-xl font-medium">National ID card detials</p>
      <p className="ml-4 text-base text-[#A0A0A0]">Only for Indian resident </p>
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

      <button
        type="submit"
        className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save & next
      </button>
      <button className="ml-8 text-xl text-blue-700">Clear all</button>
    </form>
    // </PersonalDetailLayout>
  );
};
export default PersonalDetail;
