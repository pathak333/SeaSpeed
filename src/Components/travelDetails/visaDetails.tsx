import { useContext, useEffect, useReducer, useRef, useState } from "react";
import InputField from "../../uiComponents/inputField/inputField.component";
import { Trash2, Upload } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { TravelDetailContext, TravelState } from "../../contexts/travelDetail.context";
import { NormalVisaValidation, VisaDetailValidation } from "./validation";
import { toast } from "react-toastify";
import { useGlobalState } from "../../contexts/global.context";
import { LOADING } from "../../constants/action.constant";
import { GetVisaDetailService, UpdateVisaDetailService, addVisaDetailService } from "../../services/user.service";
import FileUpload from "../../uiComponents/inputField/fileUpload.component";
import { ExpireformattedDateFormNow, IssuesformattedDate } from "../../constants/values.constants";
import ApproveReject from "../../uiComponents/approve_reject";
import { getCrewVisaDetail } from "../../services/admin.service";
import { isObjectEmpty } from "../../constants/commonFunction";
import ReactDOM from 'react-dom';
import PdfViewer from "../../uiComponents/pdf_viewer";

const VisaDetail = (props: any) => {



  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');



  const [fileData,updateFileData] = useState<any>()
  const [selectedPdf,updateSelectedPdf] = useState<any>()


  const { setState } = useContext(TravelDetailContext)!;
  useEffect(() => {
    fetchData();
    setState(TravelState.visa);

  }, [])

  async function fetchData() {
    const { data } = id === null ? await GetVisaDetailService() : await getCrewVisaDetail(id)
    console.log(data)
    if (data.success && data.data ) {
      console.log("data inter")
      if (!isObjectEmpty(data.data) && data.data.visaList.length > 0) {
        data.data.visaList.map((e: any) => delete e._id)
       // updateFileData(data.data.visaList.documentId)
      }
      console.log(data.data);
      
      updateEvent(data.data)
    }
  }


  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();


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
      visaList: [],
      us_placeOfIssue: "",
      us_number: "",
      us_dateOfIssue: "",
      us_dateOfExpiry: "",
      documentId: "",
      error: { key: "", value: "" },
      isFormChanged: false
    }
  );

  const addMore = async () => {
    try {
      let { visatype, placeOfIssue, number, dateOfIssue, dateOfExpiry, documentId } = formEvent;
      let data = { visatype, placeOfIssue, number, dateOfIssue, dateOfExpiry,documentId };
      let isValid = await NormalVisaValidation(data)
      if (isValid) {
        updateEvent({
          visaList: [...formEvent.visaList, data],
          visatype: "",
          placeOfIssue: "",
          number: "",
          dateOfIssue: "",
          dateOfExpiry: "",
          documentId:""

        })
        updateFileData("")
      } else {
        throw Error(isValid);
      }
      console.log(formEvent.visaList)
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
    }

  }

  const handleDoubleClick = (url:any) => {
    // Download the PDF on a double click
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function openPdfViewerWindow(url:any){
    updateSelectedPdf(url)
  }
  const remove =()=> updateSelectedPdf("")


  const listofData = formEvent.visaList.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b">
      <td className="px-6 py-4">{item.visatype}</td>
      <td className="px-6 py-4">{item.placeOfIssue}</td>
      <td className="px-6 py-4">{item.number}</td>
      <td className="px-6 py-4">{item.dateOfIssue.split("T")[0]}</td>
      <td className="px-6 py-4">{item.dateOfExpiry.split("T")[0]}</td>
      {/* <td className="px-6 py-4"><a href={item.documentId.link}>{ item.documentId.name ?? "File" }</a></td> */}
      <td className="px-6 py-4" onClick={() => openPdfViewerWindow(item.documentId.link)} onDoubleClick={()=>handleDoubleClick(item.documentId.link)} >{ item.documentId.name ?? "File" }</td>
      <td className="px-6 py-4">
        <Trash2
          onClick={() => {
            formEvent.visaList.splice(index, 1);
            updateEvent({ visaList: formEvent.visaList });
          }}
        />
      </td>
    </tr>
  ));

  const handleSubmit = async (event: any) => {
    console.log(formEvent)
     toast.dismiss();
     event.preventDefault();
   

    
    
    dispatch({ type: LOADING, payload: true });
    if ( formEvent.visaList.length > 0) { 
      formEvent.visaList.map((e: any) => {
       return typeof e.documentId === 'string' ? null : e.documentId = e.documentId._id
      })
    }
    console.log(formEvent.visaList,"formEvent.visaList");
    

    let { visaList, haveNoVisa, haveNoUsVisa, us_placeOfIssue, us_number, us_dateOfIssue, us_dateOfExpiry } = formEvent;
    // if (!haveNoVisa && visaList.length === 0) {
    //   addMore()
    // }
    
    let formdata = {};



  
    if (haveNoUsVisa) {
      formdata = { ...formdata, haveNoUsVisa }
    } else {
      formdata = {
        ...formdata, haveNoUsVisa, us_placeOfIssue, us_number, us_dateOfIssue, us_dateOfExpiry
      }
    }
    

    if (haveNoVisa) {
      formdata = { ...formdata, haveNoVisa }
    } else {
      formdata = {
        ...formdata,visaList, haveNoVisa,
    }
    
      
    }

    try {
      console.log(formdata)
      
      const isValid = await VisaDetailValidation(formdata)
      if (isValid) {
        const { data } = formEvent.hasOwnProperty("user_id") ? await UpdateVisaDetailService(formdata) : await addVisaDetailService(formdata)
        if (data.success) {
          toast.info(data.message)

          navigate("/dashboard/traveldetails/SeaMenBookdetail");
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
          if (errorDetail.context.key === "visaList") {
            toast.error("Please add atleast one visa detail");
          } else {
            toast.error(errorDetail.message);
          }
        }
      } else if (error.name === "AxiosError") {
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  }


  const getDocId = (data: any) => {
    updateFileData(data)
   return updateEvent({ documentId: data._id,isFormChanged: true  })

  }

  const errorReturn = (field: string) =>
    formEvent.error.key === field ? formEvent.error.value : "";

  return (
    <form ref={formRef} onSubmit={handleSubmit} >
      <div className="flex flex-row items-center">
        <h3 className="pl-4 font-semibold mr-2">Visa details</h3>
        <input
          id="haveNoVisa"
          type="checkbox"
          checked={formEvent.haveNoVisa}
          value={formEvent.haveNoVisa}
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ haveNoVisa: e.target.checked, isFormChanged: true });
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
          onChange={(e) => updateEvent({ visatype: e.target.value, isFormChanged: true })}
          value={formEvent.visatype ?? ""}
        />
        <InputField
          className="m-4"
          fieldName={"placeOfIssue"}
          label={"Place of issue"}
          type={"text"}
          disabled={formEvent.haveNoVisa}
          error={errorReturn("placeOfIssue")}
          onChange={(e) => updateEvent({ placeOfIssue: e.target.value, isFormChanged: true })}
          value={formEvent.placeOfIssue ?? ""}
        />
        <InputField
          className="m-4"
          fieldName={"number"}
          label={"Number"}
          type={"number"}
          disabled={formEvent.haveNoVisa}
          error={errorReturn("number")}
          onChange={(e) => updateEvent({ number: e.target.value, isFormChanged: true })}
          value={formEvent.number ?? ""}
        />
        <InputField
          className="m-4"
          fieldName={"dateOfIssue"}
          label={"Date of issue"}
          disabled={formEvent.haveNoVisa}
          type={"date"}
          max={IssuesformattedDate}
          error={errorReturn("dateOfIssue")}
          onChange={(e) => updateEvent({ dateOfIssue: e.target.value, isFormChanged: true })}
          value={formEvent.dateOfIssue ?? ""}
        />
        <InputField
          className="m-4"
          fieldName={"dateOfExpiry"}
          label={"Date of expiry"}
          disabled={formEvent.haveNoVisa}
          type={"date"}
          min={ExpireformattedDateFormNow}
          error={errorReturn("dateOfExpiry")}
          onChange={(e) => updateEvent({ dateOfExpiry: e.target.value, isFormChanged: true })}
          value={formEvent.dateOfExpiry ?? ""}
        />
        {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
          <Upload className="text-IbColor" />
          <p className="text-IbColor">Upload Visa PDF</p>
        </div> */}
        <FileUpload folder={"visaDetailDoc"} name="visa" expireDate={formEvent.dateOfExpiry} from="user"  dataFun={getDocId} />
        <h1 className="ml-3 text-IbColor"> {fileData !== undefined && fileData !== "" ? <a href={fileData?.link}>You have uploaded one file { fileData?.name }, Click to download</a> :""}</h1>

      </div>
      <div className="flex justify-center m-2 ">
        <button type="button" onClick={() => addMore()} className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Add more
        </button>

      </div>


      {formEvent.visaList.length > 0 ? (
        <div className="relative overflow-x-auto mb-3">
          <table className="table-auto w-full text-sm text-left text-grey-500">
            <thead className="text-xs text-grey-700 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Visa type
                </th>
                <th scope="col" className="px-6 py-3">
                  Place Of Issue
                </th>
                <th scope="col" className="px-6 py-3">
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Of Issue
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Of Expiry
                </th>
                <th scope="col" className="px-6 py-3">
                  File
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{listofData}</tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}


{selectedPdf && (globalState.data.data.role === 'admin' || globalState.data.data.role === 'superadmin') && <PdfViewer url={selectedPdf} close={remove}/>}




      <div className="flex flex-row items-center">
        <h3 className="pl-4 font-semibold mr-2">US visa type </h3>
        <input
          id="haveNoVisa"
          type="checkbox"
          checked={formEvent.haveNoUsVisa}
          value={formEvent.haveNoUsVisa ?? ""}
          onChange={(e) => {
            console.log(e.target.checked);
            updateEvent({ haveNoUsVisa: e.target.checked, isFormChanged: true });
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
          onChange={(e) => updateEvent({ us_placeOfIssue: e.target.value, isFormChanged: true })}
          value={formEvent.us_placeOfIssue ?? ""}
        />
        <InputField
          className="m-4"
          fieldName={"us_number"}
          label={"Number"}
          type={"number"}
          disabled={formEvent.haveNoUsVisa}
          error={errorReturn("us_number")}
          onChange={(e) => updateEvent({ us_number: e.target.value, isFormChanged: true })}
          value={formEvent.us_number ?? ""}
        />
        <InputField
          className="m-4"
          fieldName={"us_dateOfIssue"}
          label={"Date of issue"}
          disabled={formEvent.haveNoUsVisa}
          type={"date"}
          max={IssuesformattedDate}
          error={errorReturn("us_dateOfIssue")}
          onChange={(e) => updateEvent({ us_dateOfIssue: e.target.value, isFormChanged: true })}
          value={formEvent.us_dateOfIssue.split("T")[0] ?? ""}
        />
        <InputField
          className="m-4"
          fieldName={"us_dateOfExpiry"}
          label={"Date of expiry"}
          disabled={formEvent.haveNoUsVisa}
          type={"date"}
          min={ExpireformattedDateFormNow}
          error={errorReturn("us_dateOfExpiry")}
          onChange={(e) => updateEvent({ us_dateOfExpiry: e.target.value, isFormChanged: true })}
          value={formEvent.us_dateOfExpiry.split("T")[0] ?? ""}
        />
      </div>
      {id === null && <div>
        <button
          className="ml-8 text-xl text-gray-500"
          onClick={() => navigate("/dashboard/traveldetails")}
        >
          Previous
        </button>
        {formEvent.isFormChanged ? <button
          type="submit"
          // disabled={(!formEvent.haveNoVisa  && (formEvent.visaList.length === 0))}
          className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-textGrey focus:bg-textGrey visited:bg-textGrey"
        >
          Save & next
        </button> :
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
      </div>
      }
      {globalState.data.data.permission.includes("application") &&
        <div>
          {id !== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { }}>Save</button>}

          {id !== null && !formEvent.isFormChanged && <div id="approver">
            <ApproveReject name="traveldetails" navigation={`/adminDashboard/traveldetails/SeaMenBookdetail/?id=${id}`} locationStateData={{}} doc_id="VisaDetail" user_id={id} />
          </div>}
        </div>}
      {(globalState.data.data.permission.includes("admin") || ("vessel")) && id !== null &&
        <div>
          <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/traveldetails/SeaMenBookdetail/?id=${id}`);
            }}
          >
            Next
          </button>
        </div>}
    </form>
  );
};

export default VisaDetail;
