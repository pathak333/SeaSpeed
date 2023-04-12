import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import { BankDetailService, GetBankDetail } from "../../services/user.service";
import InputField from "../inputField/inputField.component";
import { BankDetailValidation } from "./validation";

const BankDetail = () => {
  const navigate = useNavigate();
  const { setState } = useContext(PersonalDetailContext)!;
  const [, dispatch] = useGlobalState();

  useEffect(() => {
    fetchData();
    setState(Personalstate.bankDetails);
  }, []);

  async function fetchData() {
    const { data } = await GetBankDetail();
    if (data.data.bankDetail) {
      updateEvent(data.data.bankDetail);
    }
  }

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      bank_name: "",
      account_holder_name: "",
      branch_code: "",
      account_number: "",
      swift_code: "",
      IFSC_code: "",
      IBAN_number: "",
      account_type: "",
      isFormChanged:false,
      error: { keys: "", values: "" },
    }
  );

  const handleSubmit = async (event: any) => {
    // BankDetail
    toast.dismiss();
    dispatch({ type: LOADING, payload: true });
    try {
      event.preventDefault();
      console.log(formEvent);
      let formData = { ...formEvent };
      delete formData.error;
      delete formData.isFormChanged
      const isValid = await BankDetailValidation(formData);
      if (isValid) {
        console.log(formData);
        const { data } = await BankDetailService(formData);
        console.log(data);
        if (data.success) {
          navigate("/dashboard/personaldetails/kinDetail");
        }
        // dispatch({ type: LOADING, payload: false });
      } else {
        console.log(isValid);

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

  const clearAllData = () => {
    updateEvent({
      bank_name: "",
      account_holder_name: "",
      branch_code: "",
      account_number: "",
      swift_code: "",
      IFSC_code: "",
      IBAN_number: "",
      account_type: "",
      
    });
  };
  const errorReturn = (field: string) =>
    formEvent.error.keys === field ? formEvent.error.values : "";

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="pl-4 font-semibold">Bank details</h3>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"bank_name"}
          label={"Bank name"}
          type={"text"}
          error={errorReturn("bank_name")}
          onChange={(e) => updateEvent({ bank_name: e.target.value,isFormChanged:true })}
          value={formEvent.bank_name}
        />
        <InputField
          className="m-4"
          fieldName={"account_holder_name"}
          label={"Account holder name"}
          type={"text"}
          error={errorReturn("account_holder_name")}
          onChange={(e) => updateEvent({ account_holder_name: e.target.value,isFormChanged:true })}
          value={formEvent.account_holder_name}
        />
        <InputField
          className="m-4"
          fieldName={"branch_code"}
          label={"Branch code"}
          type={"text"}
          error={errorReturn("branch_code")}
          onChange={(e) => updateEvent({ branch_code: e.target.value,isFormChanged:true })}
          value={formEvent.branch_code}
        />
        <InputField
          className="m-4"
          fieldName={"account_number"}
          label={"Account number"}
          type={"text"}
          error={errorReturn("account_number")}
          onChange={(e) => updateEvent({ account_number: e.target.value,isFormChanged:true })}
          value={formEvent.account_number}
        />
        <InputField
          className="m-4"
          fieldName={"swift_code"}
          label={"Swift code"}
          type={"text"}
          error={errorReturn("swift_code")}
          onChange={(e) => updateEvent({ swift_code: e.target.value,isFormChanged:true })}
          value={formEvent.swift_code}
        />
        <InputField
          className="m-4"
          fieldName={"IFSC_code"}
          label={"IFSC code only for Indians"}
          type={"text"}
          error={errorReturn("IFSC_code")}
          onChange={(e) => updateEvent({ IFSC_code: e.target.value,isFormChanged:true })}
          value={formEvent.IFSC_code}
        />
        <InputField
          className="m-4"
          fieldName={"IBAN_number"}
          label={"IBAN number (Not for indian)"}
          type={"text"}
          error={errorReturn("IBAN_number")}
          onChange={(e) => updateEvent({ IBAN_number: e.target.value ,isFormChanged:true})}
          value={formEvent.IBAN_number}
        />
        <InputField
          className="m-4"
          fieldName={"account_type"}
          label={"Types of account"}
          type={"text"}
          error={errorReturn("account_type")}
          onChange={(e) => updateEvent({ account_type: e.target.value,isFormChanged:true })}
          value={formEvent.account_type}
        />
      </div>
    { formEvent.isFormChanged ?<button
        type="submit"
        // onClick={() => navigate("/dashboard/personaldetails/kinDetail")}
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save & next
      </button>:
      <button
        type="button"
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          clearAllData();
          navigate("/dashboard/personaldetails/kinDetail");
        }}
      >
        Skip and Next
      </button>}
      <button
        type="button"
        className="ml-8 text-xl text-blue-700"
        onClick={() => {
          clearAllData();
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
