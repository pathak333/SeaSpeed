import { useContext, useEffect, useReducer, useState } from "react";
// import InputField from "../../uiComponents/inputField/inputField.component";
import InputField from "../../uiComponents/inputField/inputField.component";
import FileUpload from "../../uiComponents/inputField/fileUpload.component";
// import SelectInput from "../../uiComponents/inputField/selectInputField.comonent";

import { useLocation, useNavigate } from "react-router-dom";
import { TravelDetailContext, TravelState } from "../../contexts/travelDetail.context";
import { GetPassportDetailService, PassportDetailService, updatePassportDetailService } from "../../services/user.service";
import { toast } from "react-toastify";
import { PassportValidation } from "./validation";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import { ExpireformattedDateFormNow, IssuesformattedDate } from "../../constants/values.constants";
import { getCrewPassportDetail, updatePassportDetailAdmin } from "../../services/admin.service";
import ApproveReject from "../../uiComponents/approve_reject";
import PdfViewer from "../../uiComponents/pdf_viewer";
import { UNLIMITED } from "../../constants/constData";


const PassPortDetail = (props: any) => {



  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');


  const [fileData, updateFileData] = useState<any>()



  const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();
  const { setState } = useContext(TravelDetailContext)!;
  useEffect(() => {
    fetchData();
    setState(TravelState.passport);

  }, [])


  async function fetchData() {
    const { data } = id === null ? await GetPassportDetailService() : await getCrewPassportDetail(id)
    console.log(data)
    if (data.success && data.data) {
      console.log(data.data, "data inter")
      updateEvent(data.data)
      updateFileData(data.data.documentId)
    }
  }

  const getDocId = (data: any) => {
    updateFileData(data)
    return updateEvent({ documentId: data._id, isFormChanged: true })
  }

  const handlerSubmit = async (event: any) => {
    toast.dismiss();
    event.preventDefault();
    try {
      // let formData = { ...formEvent };
      // delete formData.error;
      // delete formData.isFormChanged;
      // delete formData._id
      // delete form
      let { passportNumber,
        placeOfIssue,
        dateOfIssue,
        dateOfExpiry,
        documentId,
        // ECNR
      } = formEvent;

      let postData = {
        passportNumber,
        placeOfIssue,
        dateOfIssue,
        dateOfExpiry,
        documentId,
        //ECNR
      }
      console.log(postData);
      if (formEvent.hasOwnProperty("user_id")) {
        if (!(typeof formEvent.documentId === 'string')) {      
          postData.documentId = postData.documentId._id
        }
}
      const isValid = await PassportValidation(postData);
      if (isValid) {
        const { data } =id ? await updatePassportDetailAdmin({_id:id,...postData}) : formEvent.hasOwnProperty("user_id") ? await updatePassportDetailService(postData) : await PassportDetailService(postData)
        // const { data } = await updatePassportDetailApi(postData);
        // const { data } = await PassportDetailService(postData);
        if (data.success) {
          toast.info(data.message)
          updateEvent({isFormChanged:false})
        if(!id) navigate("/dashboard/traveldetails/visadetail");
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

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      passportNumber: "",
      placeOfIssue: "",
      dateOfIssue: "",
      dateOfExpiry: "",
      documentId: "",
      //ECNR: "Yes",
      isFormChanged: false,
      error: { key: "", value: "" },
    }
  );

  function clearAllData() {

  }

  const errorReturn = (field: string) =>
    formEvent.error.key === field ? formEvent.error.value : "";

  return (
    <form onSubmit={handlerSubmit}>
      <h3 className="pl-4 font-semibold">Passport Detail</h3>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"passportNumber"}
          label={"Passport Number"}
          type={"text"}

          error={errorReturn("passportNumber")}
          onChange={(e) => updateEvent({ passportNumber: e.target.value, isFormChanged: true })}
          value={formEvent.passportNumber}
        />
        <InputField
          className="m-4"
          fieldName={"placeOfIssue"}
          label={"Place of issue"}
          type={"text"}
          // disabled={true}
          error={errorReturn("placeOfIssue")}
          onChange={(e) => updateEvent({ placeOfIssue: e.target.value, isFormChanged: true })}
          value={formEvent.placeOfIssue}
        />
        <InputField
          className="m-4"
          fieldName={"dateOfIssue"}
          label={"Date of issue"}
          type={"date"}
          max={IssuesformattedDate}
          error={errorReturn("dateOfIssue")}
          onChange={(e) => updateEvent({ dateOfIssue: e.target.value, isFormChanged: true })}
          value={formEvent.dateOfIssue.split("T")[0]}
        />
        <div className="flex">
        <InputField
          className="m-4 flex-1"
          fieldName={"dateOfExpiry"}
          label={"Date of expiry"}
          type={"date"}
          min={ExpireformattedDateFormNow}
          error={errorReturn("dateOfExpiry")}
          onChange={(e) => updateEvent({ dateOfExpiry: e.target.value, isFormChanged: true })}
          value={formEvent.dateOfExpiry.split("T")[0]}
          />
          <span className="flex self-center items-center">
                <p>| &nbsp;</p>
                    <label htmlFor="unlimited" className=" font-semibold" >NO Expiry&nbsp;&nbsp;</label>
                    <input className="w-4 h-4 mr-4"
                        id="unlimited"
                name="unlimited"
                type={"checkbox"}
                value={formEvent.dateOfExpiry}
                onChange={(e) => updateEvent({ dateOfExpiry: UNLIMITED })}
                    />
                </span>
          </div>
        {/* <SelectInput
          className="m-4"
          fieldName={"ECNR"}
          label={"ECNR"}
          type={""}
          onChange={(e) => updateEvent({ ECNR: e.target.value,isFormChanged:true })}
          value={formEvent.ECNR}
          error={errorReturn("ECNR")}
          option={["Yes", "No"]}
        /> */}

        <div>
          {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
            <Upload className="text-IbColor" />
            <p className="text-IbColor">Upload Passport PDF</p>
          </div> */}
          <FileUpload folder={"passport"} name="passport" expireDate={formEvent.dateOfExpiry.split("T")[0]} from={id ? "admin" :"user"} dataFun={getDocId} />
          <h1 className="m-3 font-semibold text-IbColor"> {fileData !== undefined ? <a href={fileData?.link}>You have uploaded one file {fileData?.name}, Click to download</a> : ""}</h1>

          <ul className="list-disc ml-4">
            <li className="text-textGrey text-sm ml-3">
              Your passport should have minimum 3 blank pages
            </li>
            <li className="text-textGrey text-sm ml-3">
              The passport being uploaded needs to have an expiration date of at
              least a year or more from this day.
            </li>
          </ul>
        </div>
      </div>
      {fileData?.link && (globalState?.data?.data?.role === 'admin' || globalState?.data?.data?.role === 'superadmin') && <PdfViewer url={fileData?.link} />}
      {id === null && <div className="m-3">
        {formEvent.isFormChanged ? <button
          type="submit"
          className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save & next
        </button> :
          <button
            type="button"
            className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {

              navigate("/dashboard/traveldetails/visadetail");
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
      {globalState?.data?.data?.permission.includes("application") &&
        <div>
          {id !== null && formEvent.isFormChanged && <button type="button" className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handlerSubmit}>Save</button>}

          {id !== null && !formEvent.isFormChanged && <div id="approver">
            <ApproveReject name="traveldetails" navigation={`/adminDashboard/traveldetails/visadetail/?id=${id}`} locationStateData={{}} doc_id="PassPortDetail" user_id={id} />
          </div>}
        </div>}

      {id !== null && (globalState?.data?.data?.permission.includes("admin") || globalState?.data?.data?.permission.includes("vessel")) &&
        <div>
          <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/traveldetails/visadetail/?id=${id}`);
            }}
          >
            Next
          </button>
        </div>}
    </form>
  );
};

export default PassPortDetail;
