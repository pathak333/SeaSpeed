import { useContext, useEffect, useReducer, useState } from "react";
import InputField from "../../uiComponents/inputField/inputField.component";
import { Trash2, Upload } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { SeamenBookValidation } from "./validation";
import { toast } from "react-toastify";
import { addSeamenBookDetail, deleteSeamenBookDetail, getSeamenBookDetail } from "../../services/user.service";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import { TravelDetailContext, TravelState } from "../../contexts/travelDetail.context";
import FileUpload from "../../uiComponents/inputField/fileUpload.component";
import { IssuesformattedDate, ExpireformattedDateFormNow } from "../../constants/values.constants";
import { addSeamenBookAdmin, getCrewSeamenBook } from "../../services/admin.service";
import ApproveReject from "../../uiComponents/approve_reject";
import PdfViewer from "../../uiComponents/pdf_viewer";
import { UNLIMITED } from "../../constants/constData";


const SeaMenBookDetail = () => {


  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [fileData,updateFileData] = useState<any>()
  const [selectedPdf,updateSelectedPdf] = useState<any>()



  const navigate = useNavigate()
  const [globalState, dispatch] = useGlobalState();
  const { setState } = useContext(TravelDetailContext)!;
  async function fetchData() {
    const { data } = id === null ? await getSeamenBookDetail() : await getCrewSeamenBook(id);
    updateEvent({ savedData: data.data })
  }


  function openPdfViewerWindow(url:any){
    updateSelectedPdf(url)
  }
  const remove =()=> updateSelectedPdf("")
  

  useEffect(() => {
    fetchData();
    setState(TravelState.seamenBook);

  }, [])


  const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
    let newEvent = { ...prev, ...next };
    return newEvent;
  }, {
    placeOfIssue: "",
    number: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    sidNumber: "",
    Indos: "",
    documentId:"",
    dataList: [],
    savedData: [],
    error: { key: "", value: "" },
    isFormChanged: false
  })


  const addMore = async () => {
    try {
      let data = { ...formEvent }
      console.log(data)
      delete data.error
      delete data.isFormChanged
      delete data.dataList
      delete data.savedData

      let isValid = await SeamenBookValidation(data)
      if (isValid) {
        updateEvent({
          dataList:id ? [...formEvent.dataList, {user_id:id,...data}] : [...formEvent.dataList, data],
          placeOfIssue: "",
          number: "",
          dateOfIssue: "",
          dateOfExpiry: "",
          sidNumber: "",
          Indos: "",
      documentId:"",

        })
      
        updateFileData("")
      }
      return id? [{user_id:id,...data}] : [data];
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
      return 'error'
    }
  }


  const listofData = formEvent.dataList.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
      <td className="px-6 py-4">{item.number}</td>
      <td className="px-6 py-4">{item.placeOfIssue}</td>
      <td className="px-6 py-4">{item.dateOfIssue.split("T")[0]}</td>
      <td className="px-6 py-4">{item.dateOfExpiry === UNLIMITED ? "UNLIMITED" : item.dateOfExpiry.split("T")[0]}</td>
      <td className="px-6 py-4">{item.sidNumber}</td>
      <td className="px-6 py-4">{item.Indos}</td>
      <td className="px-6 py-4"><a href={item.documentId.link}>{ item.documentId.name ?? "File" }</a></td>
      <td className="px-6 py-4">
        <Trash2
          onClick={() => {
            formEvent.dataList.splice(index, 1);
            updateEvent({ dataList: formEvent.dataList });
          }}
        />
      </td>
    </tr>
  ));
  const SavelistofData = formEvent.savedData.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
      <td className="px-6 py-4">{item.number}</td>
      <td className="px-6 py-4">{item.placeOfIssue}</td>
      <td className="px-6 py-4">{item.dateOfIssue.split("T")[0]}</td>
      <td className="px-6 py-4">{item.dateOfExpiry.split("T")[0] === UNLIMITED ? "UNLIMITED" :item.dateOfExpiry.split("T")[0]}</td>
      <td className="px-6 py-4">{item.sidNumber}</td>
      <td className="px-6 py-4">{item.Indos}</td>
      {/* <td className="px-6 py-4"><a href={item.documentId.link}>{ item.documentId.name ?? "File" }</a></td> */}
       <td className="px-6 py-4 text-blue-800 font-semibold cursor-pointer" onClick={() => openPdfViewerWindow(item.documentId.link)}  >{ item.documentId.name ?? "File" }</td>
      <td className="px-6 py-4">
        <Trash2
          onClick={async () => {
            
            formEvent.savedData.splice(index, 1);
            updateEvent({ dataList: formEvent.dataList });
          await deleteSeamenBookDetail(item._id)
          }}
        />
      </td>
    </tr>
  ));




  const handlerSubmit = async (event?: any) => {
    toast.dismiss();
    console.log("handle submit");
    
  if(event)  event.preventDefault();
    dispatch({ type: LOADING, payload: true });
   
    try {
      if (formEvent.dataList.length === 0) {
        addMore().then(async (result:any) => {
          const { data } = id ? await addSeamenBookAdmin(result) : await addSeamenBookDetail(result);
          if (data.success) {
            toast.info(data.message)
            updateEvent({isFormChanged:false})
            if(!id)  navigate("/dashboard/certificates"); 
          } else {
            throw Error(data.message)
          }
        })
      
      } else {
        const { data } = id ? await addSeamenBookAdmin(formEvent.dataList) : await addSeamenBookDetail(formEvent.dataList);
        if (data.success) {
          toast.info(data.message)
          updateEvent({isFormChanged:false,dataList:[]})
          if(!id)  navigate("/dashboard/certificates"); 
        } else {
          throw Error(data.message)
        }
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
    
  
    
  }

  const getDocId = (data: any) => {
    updateFileData(data)
   return updateEvent({ documentId: data._id,isFormChanged: true  })
  }


  const errorReturn = (field: string) =>
    formEvent.error.key === field ? formEvent.error.value : "";

  return <form  >
    <h3 className="pl-4 font-semibold">seamen book details (CDC)</h3>
    <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
    <InputField
        className="m-4"
        fieldName={"number"}
        label={"Number"}
        type={"text"}
        error={errorReturn("number")}
        onChange={(e) => updateEvent({ number: e.target.value, isFormChanged: true })}
        value={formEvent.number}
      />
      <InputField
        className="m-4"
        fieldName={"placeOfIssue"}
        label={"Place of issue"}
        type={"text"}
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
        value={formEvent.dateOfIssue}
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
        value={formEvent.dateOfExpiry}
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
      <InputField
        className="m-4"
        fieldName={"sidNumber"}
        label={"SID number and date of issue"}
        type={"text"}
        error={errorReturn("sidNumber")}
        onChange={(e) => updateEvent({ sidNumber: e.target.value, isFormChanged: true })}
        value={formEvent.sidNumber}
      />
      <InputField
        className="m-4"
        fieldName={"Indos"}
        label={"INDOS number and date of issue"}
        type={"text"}
        error={errorReturn("Indos")}
        onChange={(e) => updateEvent({ Indos: e.target.value, isFormChanged: true })}
        value={formEvent.Indos}
      />
      {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
                <Upload className="text-IbColor" />
                <p className="text-IbColor">Upload Seamen book PDF</p>
            </div> */}
      <FileUpload folder={"seamenBook"} name="seamen book "  expireDate={formEvent.dateOfExpiry} from={id ? "admin" :"user"} dataFun={getDocId} />
      <h1 className="ml-3 text-IbColor"> {fileData !== undefined ? <a href={fileData?.link}>You have uploaded one file { fileData?.name }</a> :""}</h1>

    </div>

    <div className="flex justify-center m-2">
      <button type="button" onClick={() => addMore()} className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        Add more
      </button>

    </div>


    {formEvent.dataList.length > 0 || formEvent.savedData.length > 0 ? (
      <div className="relative overflow-x-auto mb-3">
        <table className="table-auto w-full text-sm text-left text-grey-500">
          <thead className="text-xs text-grey-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Place Of Issue
              </th>

              <th scope="col" className="px-6 py-3">
                Date Of Issue
              </th>
              <th scope="col" className="px-6 py-3">
                Date Of Expiry
              </th>
              <th scope="col" className="px-6 py-3">
                SID
              </th>
              <th scope="col" className="px-6 py-3">
                INDOS
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
          <tbody>{SavelistofData}</tbody>
        </table>
      </div>
    ) : (
      <div></div>
    )}

{selectedPdf && (globalState.data.data.role === 'admin' || globalState.data.data.role === 'superadmin') && <PdfViewer url={selectedPdf} close={remove}/>}

    {id === null && <div>


      <button
        className="ml-8 text-xl text-gray-500"
        onClick={() => navigate("/dashboard/traveldetails/visadetail")}
      >
        Previous
      </button>
      {formEvent.isFormChanged ? <button
        type="button"
        disabled={formEvent.dataList.length === 0}
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:focus::bg-blue-300  disabled:hover:bg-blue-300 disabled:bg-blue-300"
      onClick={(e:any)=>handlerSubmit(e)}
      >
        Save & next
      </button> :
        <button
          type="button"
          className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {

            navigate("/dashboard/certificates");
          }}
        >
          Skip and Next
        </button>}
      <button
        type="button"
        className="ml-8 text-xl text-blue-700"
        onClick={() => {
          //clearAllData();

        }}
      >
        Clear all
      </button>

    </div>
    }
{ globalState?.data?.data?.permission.includes("application") && 
        <div>
    {id !== null && formEvent.isFormChanged && <button type="button" className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" disabled={!formEvent.isFormChanged} onClick={(e:any)=>handlerSubmit(e)}>Save</button>}

    {id !== null && !formEvent.isFormChanged && <div id="approver">
      <ApproveReject name="traveldetails" navigation={`/adminDashboard/certificates/?id=${id}`} locationStateData={{}}  doc_id="SeaMenBookDetail" user_id={id}/>
    </div>}
    </div>}
    { (globalState?.data?.data?.permission.includes("admin") || ("vessel") ) && id !== null &&
        <div>
           <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/certificates/?id=${id}`);
            }}
          >
           Next
          </button>
      </div> }
  </form>
}

export default SeaMenBookDetail;
