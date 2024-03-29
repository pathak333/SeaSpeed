import { useContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import { BankDetailService, GetBankDetail, UpdateBankDetailService } from "../../services/user.service";

import { BankDetailValidation, UpdateBankDetailValidation } from "./validation";

import FileUpload from "../../uiComponents/inputField/fileUpload.component";
import InputField from "../../uiComponents/inputField/inputField.component";
import SelectInput from "../../uiComponents/inputField/selectInputField.comonent";
import { getCrewBankDetail, updateBankDetail } from "../../services/admin.service";
import ApproveReject from "../../uiComponents/approve_reject";
import PdfViewer from "../../uiComponents/pdf_viewer";
import { updateBankDetailApi } from "../../constants/api.admin.constant";
import FileUpdate from "../../uiComponents/file_update";


const BankDetail = () => {
  const [globalState, dispatch] = useGlobalState();
  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [fileData, updateFileData] = useState<any>()


  const navigate = useNavigate();
  const { setState } = useContext(PersonalDetailContext)!;
  const [updateData, setUpdateData] = useState<any>({})

  useEffect(() => {
    fetchData();
    setState(Personalstate.bankDetails);
  }, []);

  async function fetchData() {
    dispatch({ type: LOADING, payload: true });

    const { data } = id === null ? await GetBankDetail() : await getCrewBankDetail(id);
    if (data.data.bankDetail) {
      updateEvent({ ...data.data.bankDetail, isFormChanged: false });
      updateFileData(data.data.bankDetail.documentId)
    }
    dispatch({ type: LOADING, payload: false });

  }

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      // console.log(next,">>>>>>> ???? ", prev)
      if (next.isFormChanged) {
        setUpdateData({  ...updateData, ...next })
        // console.log(updateData,">>",{  ...next ,...updateData});

      }
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
      account_type: "USD",
      documentId: "",
      isFormChanged: false,
      error: { keys: "", values: "" },
    }
  );

  const getDocId = (data: any) => {

    // console.log(data,">>>>>>>>>>>>>>>",formEvent,updateData);
    updateFileData(data)
    return updateEvent({ documentId: data._id, isFormChanged: true })
  }

  const handleSubmit = async (event: any) => {
    // BankDetail
    toast.dismiss();
    dispatch({ type: LOADING, payload: true });
    try {
      event.preventDefault();
      console.log(formEvent);
      console.log(updateData, "updateData");
      let formData = formEvent.hasOwnProperty("user_id") ? { ...updateData } : { ...formEvent };
      delete formData.error;
      delete formData.isFormChanged
      const isValid = formEvent.hasOwnProperty("user_id") ? await UpdateBankDetailValidation(formData) : await BankDetailValidation(formData);
      if (isValid) {
        console.log(formData);
        const { data } = formEvent.hasOwnProperty("user_id") ? await UpdateBankDetailService(formData) : await BankDetailService(formData);
        console.log(data);
        if (data.success) {
          toast.info(data.message)
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

  const adminUpdate = async (event:any) => {
    event.preventDefault();
    delete updateData["isFormChanged"];
    updateData._id = id;
    console.log(updateData)
    const { data } = await updateBankDetail(updateData)
    if (data) {
      toast.info(data.message)
      updateEvent({ 'isFormChanged': false })
    }
  }


  const clearAllData = () => {
    updateEvent({
      bank_name: "",
      account_holder_name: "",
      branch_code: "",
      account_number: "",
      swift_code: "",
      IFSC_code: "",
      IBAN_number: "",
      account_type: "USD",
      documentId: "",

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
          onChange={(e) => updateEvent({ bank_name: e.target.value, isFormChanged: true })}
          value={formEvent.bank_name}
        />
        <InputField
          className="m-4"
          fieldName={"account_holder_name"}
          label={"Account holder name"}
          type={"text"}
          error={errorReturn("account_holder_name")}
          onChange={(e) => updateEvent({ account_holder_name: e.target.value, isFormChanged: true })}
          value={formEvent.account_holder_name}
        />
        <InputField
          className="m-4"
          fieldName={"branch_code"}
          label={"Branch code"}
          type={"text"}
          error={errorReturn("branch_code")}
          onChange={(e) => updateEvent({ branch_code: e.target.value, isFormChanged: true })}
          value={formEvent.branch_code}
        />
        <InputField
          className="m-4"
          fieldName={"account_number"}
          label={"Account number"}
          type={"text"}
          error={errorReturn("account_number")}
          onChange={(e) => updateEvent({ account_number: e.target.value, isFormChanged: true })}
          value={formEvent.account_number}
        />
        <InputField
          className="m-4"
          fieldName={"swift_code"}
          label={"Swift code"}
          type={"text"}
          error={errorReturn("swift_code")}
          onChange={(e) => updateEvent({ swift_code: e.target.value, isFormChanged: true })}
          value={formEvent.swift_code}
        />
        <InputField
          className="m-4"
          fieldName={"IFSC_code"}
          label={"IFSC code only for Indians"}
          type={"text"}
          error={errorReturn("IFSC_code")}
          onChange={(e) => updateEvent({ IFSC_code: e.target.value, isFormChanged: true })}
          value={formEvent.IFSC_code}
        />
        <InputField
          className="m-4"
          fieldName={"IBAN_number"}
          label={"IBAN number (Not for indian)"}
          type={"text"}
          error={errorReturn("IBAN_number")}
          onChange={(e) => updateEvent({ IBAN_number: e.target.value, isFormChanged: true })}
          value={formEvent.IBAN_number}
        />
        {/* <InputField
          className="m-4"
          fieldName={"account_type"}
          label={"Types of account"}
          type={"text"}
          error={errorReturn("account_type")}
          onChange={(e) => updateEvent({ account_type: e.target.value,isFormChanged:true })}
          value={formEvent.account_type}
        /> */}
        <SelectInput
          className="m-4"
          fieldName={"account_type"}
          label={"Types of account"}
          type={""}
          onChange={(e) => updateEvent({ account_type: e.target.value, isFormChanged: true })}
          value={formEvent.account_type}
          error={errorReturn("account_type")}
          option={["","USD", "INR", "PKR", "AED"]}
        />

        <FileUpload folder={"bankDetailDoc"} name="bank_cancel_cheque" from={id ? "admin" :"user"} dataFun={getDocId} />

        <p className="m-3 text-textGrey">(For-Example blank or cancel cheque)</p>
        {/* <h1 className="m-3  font-semibold text-IbColor"> {fileData !== undefined ? <a href={fileData?.link}>You have uploaded one file {fileData?.name}, Click to download</a> : ""}</h1> */}
        {fileData !== undefined ? <FileUpdate id={fileData._id} name={fileData.name} expireDate={fileData.expire} link={fileData.link} /> : <></>}
      </div>
      {fileData?.link && (globalState.data.data.role === 'admin' || globalState.data.data.role === 'superadmin') && <PdfViewer url={fileData?.link} />}
      {id === null && <div>
        <button
          className="ml-8 text-xl text-gray-500"
          onClick={() => navigate("/dashboard/personaldetails/educationDetail")}
        >
          Previous
        </button>
        {formEvent.isFormChanged ? <button
          type="submit"
          // onClick={() => navigate("/dashboard/personaldetails/kinDetail")}
          className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save & next
        </button> :
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
      </div>}

      {globalState.data.data.permission.includes("application") &&
        <div>
          {id !== null && formEvent.isFormChanged && <button type="button" className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={adminUpdate}>Save</button>}

          {id !== null && !formEvent.isFormChanged && <div id="approver">
            <ApproveReject name="personalDetail" navigation={`/adminDashboard/personaldetails/kinDetail/?id=${id}`} locationStateData={{}} doc_id="BankDetail" user_id={id} />
          </div>}
        </div>}
      {(globalState.data.data.permission.includes("admin") || ("vessel")) && id !== null &&
        <div>
          <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/personaldetails/kinDetail/?id=${id}`);
            }}
          >
            Next
          </button>
        </div>}

    </form>
  );
};
export default BankDetail;
