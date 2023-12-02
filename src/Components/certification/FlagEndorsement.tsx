import { useContext, useEffect, useReducer, useState } from "react";
import { Trash2, Upload } from "react-feather";
import InputField from "../../uiComponents/inputField/inputField.component";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FlagEndorsementValidation } from "./validation";
import { useGlobalState } from "../../contexts/global.context";
import { addFlagEndorsement, deleteFlagEndorsement, getFlagEndorsement, } from "../../services/user.service";
import { LOADING } from "../../constants/action.constant";

import FileUpload from "../../uiComponents/inputField/fileUpload.component";
import SelectInput from "../../uiComponents/inputField/selectInputField.comonent";
import { CertificateContext, CertificateState } from "../../contexts/certificate.context";
import { IssuesformattedDate, ExpireformattedDateFormNow } from "../../constants/values.constants";
import { getCrewFlagEndorsement } from "../../services/admin.service";
import ApproveReject from "../../uiComponents/approve_reject";

const FlagEndorsement = () => {

    //get query parameters 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [fileData,updateFileData] = useState<any>()




    const navigate = useNavigate()


    const [globalState, dispatch] = useGlobalState();
    const { setState } = useContext(CertificateContext)!;


    async function fetchData() {
        const { data } = id === null ? await getFlagEndorsement() : await getCrewFlagEndorsement(id);
        updateEvent({ savedData: data.data })
    }


    useEffect(() => {
        setState(CertificateState.flag);
        fetchData();
        // setState(TravelState.seamenBook);

    }, [])


    const getDocId = (data: any) => {
        updateFileData(data)
        return  updateEvent({ documentId: data._id ,isFormChanged: true })
      }

    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        name: "",
        number: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        placeOfIssue: "",
        Oil_tanker_DCE: "Support",
        //type:"",
        dataList: [],
        savedData: [],
        documentId:"",
        isFormChanged: false,
        error: { keys: "", values: "" },
    })



    const addMore = async () => {
        try {
            let data = { ...formEvent }
            delete data.error
            delete data.isFormChanged
            delete data.dataList
            delete data.savedData

            let isValid = await FlagEndorsementValidation(data)
            if (isValid) {
                updateEvent({
                    dataList: [...formEvent.dataList, data],
                    name: "",
                    number: "",
                    dateOfIssue: "",
                    dateOfExpiry: "",
                    placeOfIssue: "",
                    documentId:"",
                    Oil_tanker_DCE: "Support",

                })
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
        }
    }


    const listofData = formEvent.dataList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b">
            <td className="px-6 py-4">{item.name}</td>
            <td className="px-6 py-4">{item.number}</td>
            <td className="px-6 py-4">{item.dateOfIssue}</td>
            <td className="px-6 py-4">{item.dateOfExpiry}</td>
            <td className="px-6 py-4">{item.placeOfIssue}</td>
            <td className="px-6 py-4">{item.Oil_tanker_DCE}</td>

            <td className="px-6 py-4">file</td>
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
        <tr key={index} className="bg-white border-b">
            <td className="px-6 py-4">{item.name}</td>
            <td className="px-6 py-4">{item.number}</td>
            <td className="px-6 py-4">{item.dateOfIssue.split("T")[0]}</td>
            <td className="px-6 py-4">{item.dateOfExpiry.split("T")[0]}</td>
            <td className="px-6 py-4">{item.placeOfIssue}</td>
            <td className="px-6 py-4">{item.Oil_tanker_DCE}</td>

            <td className="px-6 py-4">file</td>
            <td className="px-6 py-4">
                <Trash2
                    onClick={async () => {
                        try {
                            const { data } = await deleteFlagEndorsement(item._id)
                            if (data.success && data.length !== 0) {
                                toast.info(data.message)
                                console.log(data);
                                formEvent.savedData.splice(index, 1);
                                updateEvent({ savedData: formEvent.savedData });

                            } else {
                                throw Error(data.message)
                            }
                        } catch (error: any) {
                            toast.error(error.response.data.message);
                        }
                    }}
                />
            </td>
        </tr>
    ));

    const handlerSubmit = async (event: any) => {
        toast.dismiss();
        event.preventDefault();
        dispatch({ type: LOADING, payload: true });
        try {
            const { data } = await addFlagEndorsement(formEvent.dataList);
            if (data.success) {
                toast.info(data.message)
                navigate("/dashboard/certificates/dangerousCargo");
            } else {
                throw Error(data.message)
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



    const errorReturn = (field: string) =>
        formEvent.error.keys === field ? formEvent.error.values : "";



    return <form onSubmit={handlerSubmit}>
        <h3 className="pl-4 font-semibold">Flag endorsement</h3>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
                className="m-4"
                fieldName={"name"}
                label={"Name"}
                type={"text"}
                error={errorReturn("name")}
                onChange={(e) => updateEvent({ name: e.target.value, isFormChanged: true })}
                value={formEvent.name}
            />
            <InputField
                className="m-4"
                fieldName={"number"}
                label={"Number"}
                type={"number"}
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
                onChange={(e) => updateEvent({ placeOfIssue: e.target.value })}
                value={formEvent.placeOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfIssue"}
                label={"Date of issue"}
                type={"date"}
                max={IssuesformattedDate}
                error={errorReturn("dateOfIssue")}
                onChange={(e) => updateEvent({ dateOfIssue: e.target.value })}
                value={formEvent.dateOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfExpiry"}
                label={"Date of expiry"}
                type={"date"}
                min={ExpireformattedDateFormNow}
                error={errorReturn("dateOfExpiry")}
                onChange={(e) => updateEvent({ dateOfExpiry: e.target.value })}
                value={formEvent.dateOfExpiry}
            />
            <SelectInput
                className="m-4"
                fieldName={"Oil_tanker_DCE"}
                label={"Level"}
                type={""}
                onChange={(e) => updateEvent({ Oil_tanker_DCE: e.target.value, isFormChanged: true })}
                value={formEvent.Oil_tanker_DCE}
                error={errorReturn("Oil_tanker_DCE")}
                option={["Support", "Operation", "Management"]}
            />

            {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
                <Upload className="text-IbColor" />
                <p className="text-IbColor">Upload Passport PDF</p>
            </div> */}
            <FileUpload folder={"flag"} name="endorsement"  from="user" dataFun={getDocId} />
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
                                Name
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
                                Place Of Issue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Level
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
        {id === null && <div>
            <button
                className="ml-8 text-xl text-gray-500"
                onClick={() => navigate("/dashboard/certificates")}
            >
                Previous
            </button>
            {formEvent.isFormChanged ? <button
                type="submit"
                disabled={formEvent.dataList.length === 0}
                className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:focus::bg-blue-300  disabled:hover:bg-blue-300 disabled:bg-blue-300"
            >
                Save & next
            </button> :
                <button
                    type="button"
                    className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => {

                        navigate("/dashboard/certificates/dangerousCargo");
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
        </div>}
        { globalState.data.data.permission.includes("application") && 
        <div>
        {id !== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { }}>Save</button>}

        {id !== null && !formEvent.isFormChanged && <div id="approver">
            <ApproveReject name="traveldetails" navigation={`/adminDashboard/certificates/dangerousCargo/?id=${id}`} locationStateData={{}}  doc_id="FlagEndorsement" user_id={id} />
        </div>}
        </div>}
{ (globalState.data.data.permission.includes("admin") || ("vessel") ) && id !== null &&
        <div>
           <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/certificates/dangerousCargo/?id=${id}`);
            }}
          >
           Next
          </button>
      </div> }

    </form>
}
export default FlagEndorsement