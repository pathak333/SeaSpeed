import { useEffect, useReducer, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Trash2, Upload } from "react-feather"
import { toast } from "react-toastify"
import { MedicalDetailsValidation, UpdateMedicalDetailsValidation, typeMedicalDetailsValidation } from "./validation"
import { ExpireformattedDateFormNow, IssuesformattedDate } from "../../constants/values.constants"
import { addMedicalDetail, deleteTypeMedicalDetail, getMedicalDetail, updateMedicalDetail } from "../../services/user.service"
import { useGlobalState } from "../../contexts/global.context"
import { LOADING } from "../../constants/action.constant"

import FileUpload from "../../uiComponents/inputField/fileUpload.component"
import InputField from "../../uiComponents/inputField/inputField.component"
import SelectInput from "../../uiComponents/inputField/selectInputField.comonent"
import { getCrewMedicalDetail } from "../../services/admin.service"
import ApproveReject from "../../uiComponents/approve_reject"
import { isObjectEmpty } from "../../constants/commonFunction"



const MedicalDetails = () => {


    //get query parameters 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');


    const [fileRegularData, updateRegularFileData] = useState<any>()
    const [fileYellowData, updateYellowFileData] = useState<any>()
    const [fileCovidData, updateCovidFileData] = useState<any>()


    const navigate = useNavigate()
    const [globalState, dispatch] = useGlobalState();
    const [updateData, setUpdateData] = useState<any>({})



    useEffect(() => {
        fetchData();
    }, []);


    async function fetchData() {
        const { data } = id === null ? await getMedicalDetail() : await getCrewMedicalDetail(id);
        if (data.data) {
            updateEvent({ ...data.data, isFormChanged: false });
            console.log(data.data,isObjectEmpty(data.data))
            if (!isObjectEmpty(data.data)) {
                updateYellowFileData(data.data.Yellow_fever_vaccination.link ?? "")
             updateCovidFileData(data.data.Covid_vaccination.link ?? "")
            }
             
        }
    }




    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        
        const newEvent = { ...prev, ...next }

        if (next.isFormChanged) {
            setUpdateData({ ...updateData, ...next  })
        }
      
        
        return newEvent;
    }, {
        type: "ILO",
        placeOfIssue: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        certificateLink: "",
        Yellow_fever_vaccination: {
            placeOfIssue: "",
            dateOfIssue: "",
            dateOfExpiry: "",
            link: "",
        },
        Covid_vaccination: {
            lastDoseDate: "",
            link: ""
        },
        typeMedicalDetails: [],
        isFormChanged: false,
        error: { key: "", value: "" },
    })



    const addMore = async () => {
        try {
            let data = { ...formEvent }
            delete data.error
            delete data.isFormChanged
            delete data.typeMedicalDetails
            delete data.Covid_vaccination
            delete data.Yellow_fever_vaccination
            delete data._id
            delete data.user_id
            delete data.isDeleted
            delete data.__v
            console.log(data)
            let isValid = await typeMedicalDetailsValidation(data)
            if (isValid) {
                updateEvent({
                    typeMedicalDetails: [...formEvent.typeMedicalDetails, data],
                    type: "ILO",
                    placeOfIssue: "",
                    dateOfIssue: "",
                    dateOfExpiry: "",
                    certificateLink: "",
                    isFormChanged:true
                })
        updateRegularFileData(undefined)

            }
        } catch (error: any) {
            if (error.name === "ValidationError") {
                for (let errorDetail of error.details) {
                    updateEvent({
                        error: {
                            key: errorDetail.context.key,
                            value: errorDetail.message,
                        },
                    });
                    console.log(errorDetail.context.key + "======");
                    toast.error(errorDetail.message);
                }
            } else if (error.name === "AxiosError")
                toast.error(error.response.data.message);
        }
    }

    const listofData = formEvent.typeMedicalDetails.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b mb-3">
            <td className="px-6 py-4">{item.type}</td>
            <td className="px-6 py-4">{item.placeOfIssue}</td>
            <td className="px-6 py-4">{item.dateOfIssue}</td>
            <td className="px-6 py-4">{item.dateOfExpiry}</td>
            <td className="px-6 py-4"><a href={item.certificateLink.link ?? "file"}>{item.certificateLink.name ?? "file"}</a></td>


            {/* <td className="px-6 py-4">file</td> */}
            <td className="px-6 py-4">
                <Trash2
                    onClick={async () => {
                        console.log(formEvent.typeMedicalDetails[index]);
                        if (formEvent.typeMedicalDetails[index].hasOwnProperty("_id")) {
                            await deleteTypeMedicalDetail(formEvent.typeMedicalDetails[index]._id, formEvent._id)
                        }
                        formEvent.typeMedicalDetails.splice(index, 1);
                        updateEvent({ typeMedicalDetails: formEvent.typeMedicalDetails });
                    }}
                />
            </td>
        </tr>
    ));

    const getregularMedicalDocId = (data: any) => {
        updateRegularFileData(data)
        return updateEvent({ certificateLink: data._id, isFormChanged: true })
    }
    const getYellowFeverDocId = (data: any) => {
        updateYellowFileData(data)
        // updateEvent({...formEvent, Yellow_fever_vaccination: { ...formEvent.Yellow_fever_vaccination, dateOfExpiry: e.target.value }, isFormChanged: true })}
        return updateEvent({...formEvent,  Yellow_fever_vaccination: {...formEvent.Yellow_fever_vaccination, link: data._id }, isFormChanged: true })
    }
    const getCovidDocId = (data: any) => {
        updateCovidFileData(data)
        return updateEvent({...formEvent, Covid_vaccination: { ...formEvent.Covid_vaccination , link: data._id }, isFormChanged: true })
    }

    const handleSubmit = async (event: any) => {
        // BankDetail
        toast.dismiss();
        dispatch({ type: LOADING, payload: true });
        try {
            event.preventDefault();
           
            console.log(formEvent);
            console.log(updateData);
            if (formEvent.hasOwnProperty("user_id")) {
                console.log('updateData',updateData);
                if (typeof updateData.Covid_vaccination.link !== 'string') {
                    updateData.Covid_vaccination.link = updateData.Covid_vaccination.link._id;
                }
                if (typeof updateData.Yellow_fever_vaccination.link !== 'string') {
                    updateData.Yellow_fever_vaccination.link = updateData.Yellow_fever_vaccination.link._id;
                }
                console.log(updateData);
                
            }

            console.log(formEvent);
            let newtypeMedicalDetails: any[] = [];
            let formData =  { ...formEvent };
            if (formData.hasOwnProperty("dateOfExpiry")) {
                formEvent.typeMedicalDetails.forEach((e: any) => {
                    if (!e.hasOwnProperty("_id")) {
                        newtypeMedicalDetails.push(e)
                    }
                })
            }
            console.log(formEvent);
            delete formData.error;
            delete formData.isFormChanged
            delete formData.certificateLink
            delete formData.dateOfExpiry
            delete formData.dateOfIssue
            delete formData.placeOfIssue
            delete formData.type
            delete formData.Yellow_fever_vaccination.isFormChanged
            delete formData.Covid_vaccination.isFormChanged
            formData.typeMedicalDetails = newtypeMedicalDetails
            console.log(formData);
            const isValid = formEvent.hasOwnProperty("user_id") ? await UpdateMedicalDetailsValidation(formData) : await MedicalDetailsValidation(formData);
            if (isValid) {

                const { data } = formEvent.hasOwnProperty("user_id") ? await updateMedicalDetail(formData, formEvent._id) : await addMedicalDetail(formData);
                console.log(data);
                if (data.success) {
                    navigate("/dashboard/unionRegistrationDetail");
                }
                // dispatch({ type: LOADING, payload: false });
            } else {
                console.log(isValid);

                throw Error(isValid);
            }
        } catch (error: any) {
            console.log(error);
            
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






    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";


    return <form onSubmit={handleSubmit}>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <SelectInput
                className="m-4"
                fieldName={"type"}
                label={"Select types of medical"}
                type={""}
                onChange={(e: any) => updateEvent({ type: e.target.value, isFormChanged: true })}
                value={formEvent.type}
                error={errorReturn("type")}
                option={["ILO", "PANAMA", "P&I"]}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfIssue"}
                label={"Date of issue"}
                type={"date"}
                max={IssuesformattedDate}
                error={errorReturn("dateOfIssue")}
                onChange={(e: any) => updateEvent({ dateOfIssue: e.target.value, isFormChanged: true })}
                value={formEvent.dateOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfExpiry"}
                label={"Date of expiry"}
                type={"date"}
                min={ExpireformattedDateFormNow}
                error={errorReturn("dateOfExpiry")}
                onChange={(e: any) => updateEvent({ dateOfExpiry: e.target.value, isFormChanged: true })}
                value={formEvent.dateOfExpiry}
            />
            <InputField
                className="m-4"
                fieldName={"placeOfIssue"}
                label={"Place of issue"}
                type={"text"}

                error={errorReturn("placeOfIssue")}
                onChange={(e: any) => updateEvent({ placeOfIssue: e.target.value, isFormChanged: true })}
                value={formEvent.placeOfIssue}
            />

            <div className="flex justify-center m-2">
                <button type="button" onClick={() => addMore()} className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    Add more
                </button>

            </div>
            {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
                <Upload className="text-IbColor" />
                <p className="text-IbColor">Upload Certificates PDF</p>
            </div> */}
            <FileUpload folder={"regularMedicalCertificate"} name="regular_certificate" expireDate={formEvent.dateOfExpiry} from="user" dataFun={getregularMedicalDocId} />
            <h1 className="ml-3 text-IbColor"> {fileRegularData !== undefined ? <a href={fileRegularData?.link}>You have uploaded one file {fileRegularData?.name}</a> : ""}</h1>


        </div>
        {formEvent.typeMedicalDetails.length > 0 ? (
            <div className="relative overflow-x-auto mb-3">
                <table className="table-auto w-full text-sm text-left text-grey-500">
                    <thead className="text-xs text-grey-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Place of issue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date of issue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date of expiry
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Certificate Link
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
        <p className="font-medium text-[22px] leading-none flex flex-row ml-5 mt-3 items-center">Yellow fever vaccination</p>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">

            <InputField
                className="m-4"
                fieldName={"dateOfIssue"}
                label={"Date of issue"}
                type={"date"}
                max={IssuesformattedDate}
                error={errorReturn("dateOfIssue")}
                onChange={(e: any) => updateEvent({...formEvent, Yellow_fever_vaccination: { ...formEvent.Yellow_fever_vaccination, dateOfIssue: e.target.value }, isFormChanged: true })}
                value={formEvent.Yellow_fever_vaccination.dateOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfExpiry"}
                label={"Date of expiry"}
                type={"date"}
                min={ExpireformattedDateFormNow}
                error={errorReturn("dateOfExpiry")}
                onChange={(e: any) => updateEvent({...formEvent, Yellow_fever_vaccination: { ...formEvent.Yellow_fever_vaccination, dateOfExpiry: e.target.value }, isFormChanged: true })}
                value={formEvent.Yellow_fever_vaccination.dateOfExpiry}
            />
            <InputField
                className="m-4"
                fieldName={"placeOfIssue"}
                label={"Place of issue"}
                type={"text"}

                error={errorReturn("placeOfIssue")}
                onChange={(e: any) => updateEvent({...formEvent, Yellow_fever_vaccination: { ...formEvent.Yellow_fever_vaccination, placeOfIssue: e.target.value }, isFormChanged: true })}
                value={formEvent.Yellow_fever_vaccination.placeOfIssue}
            />
            {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
                <Upload className="text-IbColor" />
                <p className="text-IbColor">Upload Certificates PDF</p>
            </div> */}
            <FileUpload folder={"YellowFeverMedicalCertificate"} name="yellow_certificate" expireDate={formEvent.Yellow_fever_vaccination.dateOfExpiry} from="user" dataFun={getYellowFeverDocId} />
            <h1 className="ml-3 text-IbColor"> {fileYellowData !== undefined ? <a href={fileYellowData?.link}>You have uploaded one file {fileYellowData?.name}</a> : ""}</h1>

        </div>
        <p className="font-medium text-[22px] leading-none flex flex-row ml-5 items-center">Covid vaccination</p>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
                className="m-4"
                fieldName={"lastDoseDate"}
                label={"Last dose date"}
                type={"text"}

                error={errorReturn("lastDoseDate")}
                onChange={(e: any) => updateEvent({ Covid_vaccination: { ...formEvent.Covid_vaccination, lastDoseDate: e.target.value }, isFormChanged: true })}
                value={formEvent.Covid_vaccination.lastDoseDate}
            />
            {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
                <Upload className="text-IbColor" />
                <p className="text-IbColor">Upload Certificates PDF</p>
            </div> */}
            <FileUpload folder={"covidMedicalCertificate"} name="covid_certificate" from="user" dataFun={getCovidDocId} />
            <h1 className="ml-3 text-IbColor"> {fileCovidData !== undefined ? <a href={fileCovidData?.link}>You have uploaded one file {fileCovidData?.name}</a> : ""}</h1>

        </div>
        {id === null && <div>
            {formEvent.isFormChanged ? <button
                type="submit"
                disabled={formEvent.typeMedicalDetails.length === 0}
                // onClick={() => navigate("/dashboard/personaldetails/kinDetail")}
                className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-500"
            >
                Save & next
            </button> :
                <button
                    type="button"
                    className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => {
                        // clearAllData();
                        navigate("/dashboard/unionRegistrationDetail");
                    }}
                >
                    Skip and Next
                </button>}
            <button
                type="button"
                className="ml-8 text-xl text-blue-700"
                onClick={() => {
                    // clearAllData();
                }}
            >
                Clear all
            </button>
        </div>}
        {globalState.data.data.permission.includes("application") &&
            <div>
                {id !== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { }}>Save</button>}

                {id !== null && !formEvent.isFormChanged && <div id="approver">
                    <ApproveReject name="traveldetails" navigation={`/adminDashboard/unionRegistrationDetail/?id=${id}`} locationStateData={{}} doc_id="MedicalDetails" user_id={id} />
                </div>}
            </div>}
        {(globalState.data.data.permission.includes("admin") || ("vessel")) && id !== null &&
            <div>
                <button
                    type="button"
                    className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => {
                        // clearAllData();
                        navigate(`/adminDashboard/unionRegistrationDetail/?id=${id}`);
                    }}
                >
                    Next
                </button>
            </div>}

    </form>


}

export default MedicalDetails