import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import InputField from "../inputField/inputField.component";

const BankDetail = () => {
  const navigate = useNavigate();
  const { setState } = useContext(PersonalDetailContext)!;
  useEffect(() => {
    setState(Personalstate.bankDetails);
  }, []);

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      bankName: "",
      accountHolderName: "",
      branchCode: "",
      accountNumber: "",
      swiftCode: "",
      ifscCode: "",
      iban: "",
      accountType: "",
    }
  );

  const clearAllData = () => {
    updateEvent({
      bankName: "",
      accountHolderName: "",
      branchCode: "",
      accountNumber: "",
      swiftCode: "",
      ifscCode: "",
      iban: "",
      accountType: "",
    });
  };

  return (
    <form>
      <h3 className="pl-4 font-semibold">Bank details</h3>
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
      <button
        type="button"
        onClick={() => navigate("/dashboard/personaldetails/kinDetail")}
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save & next
      </button>
      <button
        type="button"
        className="ml-8 text-xl text-blue-700"
        onClick={() => {
          clearAllData();
          updateEvent({ dataList: [] });
        }}
      >
        Clear all
      </button>
      <button
        className="ml-8 text-xl text-gray-500"
        onClick={() => navigate("/dashboard/personaldetails/contactDetail")}
      >
        Previous
      </button>
    </form>
  );
};
export default BankDetail;
