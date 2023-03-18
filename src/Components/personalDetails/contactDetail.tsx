import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import InputField from "../inputField/inputField.component";

const ContactDetail = () => {
  const navigate = useNavigate();
  // const errorReturn = (field: string) =>
  //     formEvent.error.keys === field ? formEvent.error.values : "";

  const { setState } = useContext(PersonalDetailContext)!;
  useEffect(() => {
    setState(Personalstate.contactDetails);
  }, []);

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      email: "",
      code: "",
      phone: "",
      altemail: "",
      altcode: "",
      altphone: "",
    }
  );

  const handlerSubmit = async (event: any) => {
    navigate("/dashboard/personaldetails/educationDetail");
  };

  return (
    <form onSubmit={handlerSubmit}>
      <h3 className="pl-4 font-semibold">Contact details</h3>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"email"}
          label={"Email"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <div className="flex flex-row">
          <InputField
            className="m-4 w-24"
            fieldName={"code"}
            label={"Code"}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={
              (e) => ""
              //updateEvent({ firstname: e.target.value })
            }
          />
          <InputField
            className="m-4 "
            fieldName={"phone"}
            label={"Phone number"}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={
              (e) => ""
              //updateEvent({ firstname: e.target.value })
            }
          />
        </div>
      </div>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"altemail"}
          label={"Alternate Email"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
        />
        <div className="flex flex-row">
          <InputField
            className="m-4 w-24"
            fieldName={"altcode"}
            label={"Code"}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={
              (e) => ""
              //updateEvent({ firstname: e.target.value })
            }
          />
          <InputField
            className="m-4 "
            fieldName={"altphone"}
            label={"Alternate phone number"}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={
              (e) => ""
              //updateEvent({ firstname: e.target.value })
            }
          />
        </div>
      </div>
      <button
        type="submit"
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save & next
      </button>
      <button className="ml-8 text-xl text-blue-700">Clear all</button>
      <button
        className="ml-8 text-xl text-gray-500"
        onClick={() => navigate("/dashboard/personaldetails")}
      >
        Previous
      </button>
    </form>
  );
};

export default ContactDetail;
