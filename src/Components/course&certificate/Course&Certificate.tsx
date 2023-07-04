import { useEffect, useReducer } from "react"
import { useNavigate } from "react-router-dom"

import { Trash2, Upload } from "react-feather"
import { CourseCertificateValidation } from "./validation"
import { toast } from "react-toastify"
import { useGlobalState } from "../../contexts/global.context"
import { addCourseCertificate, deletetCourseCertificate, getCourseCertificate } from "../../services/user.service"
import { LOADING } from "../../constants/action.constant"
import FileUpload from "../../uiComponents/inputField/fileUpload.component"
import InputField from "../../uiComponents/inputField/inputField.component"





const CourseCertificate = () => {
    const navigate = useNavigate()


    const [, dispatch] = useGlobalState();



    async function fetchData() {
        const { data } = await getCourseCertificate();
        updateEvent({ savedData: data.data })
    }
    
    
    useEffect(() => {
        fetchData();
        // setState(TravelState.seamenBook);
    
    }, [])
        
        




    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next }
        return newEvent
    }, {
        courseName: "",
        certificateName: "",
        placeOfIssue: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        dataList: [],
        savedData: [],
        error: { key: "", value: "" },
    })


    const addMore = async () => {
        try {
            let data = { ...formEvent }
            delete data.error
            delete data.isFormChanged
            delete data.dataList
            delete data.savedData

            let isValid = await CourseCertificateValidation(data)
            if (isValid) {
                updateEvent({
                    dataList: [...formEvent.dataList, data],
                    courseName: "",
                    certificateName: "",
                    placeOfIssue: "",
                    dateOfIssue: "",
                    dateOfExpiry: "",
                })
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


    const clearAllData = () => {
        updateEvent({
            courseName: "",
            certificateName: "",
            placeOfIssue: "",
            dateOfIssue: "",
            dateOfExpiry: "",
            dataList: [],
            error: { key: "", value: "" },

        });
    };

    const listofData = formEvent.dataList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b">
            <td className="px-6 py-4">{item.courseName}</td>
            <td className="px-6 py-4">{item.certificateName}</td>
            <td className="px-6 py-4">{item.placeOfIssue}</td>
            <td className="px-6 py-4">{item.dateOfIssue}</td>
            <td className="px-6 py-4">{item.dateOfExpiry}</td>


            {/* <td className="px-6 py-4">file</td> */}
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
            <td className="px-6 py-4">{item.courseName}</td>
            <td className="px-6 py-4">{item.certificateName}</td>
            <td className="px-6 py-4">{item.placeOfIssue}</td>
            <td className="px-6 py-4">{item.dateOfIssue}</td>
            <td className="px-6 py-4">{item.dateOfExpiry}</td>


            {/* <td className="px-6 py-4">file</td> */}
            <td className="px-6 py-4">
                <Trash2
                    onClick={async() => {
                        try {
                            const { data } = await deletetCourseCertificate(item._id)
                            if (data.success && data.length !== 0) {
                                toast.info(data.message)
                                console.log(data);
                                formEvent.savedData.splice(index, 1);
                                updateEvent({ savedData: formEvent.savedData });
                             
                              } else {
                                throw Error(data.message)
                              }
                           } catch (error:any) {
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
            const { data } = await addCourseCertificate(formEvent.dataList);
            if (data.success) {
                toast.info(data.message)
                navigate("/dashboard/medicalDetails");
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
        formEvent.error.key === field ? formEvent.error.value : "";

    return <form  onSubmit={handlerSubmit}>
        {/* <h3 className="pl-4 font-semibold">Bank details</h3> */}
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
                className="m-4"
                fieldName={"courseName"}
                label={"Course Name"}
                type={"text"}
                error={errorReturn("courseName")}
                onChange={(e:any) => updateEvent({ courseName: e.target.value, isFormChanged: true })}
                value={formEvent.courseName}
            />

            <InputField
                className="m-4"
                fieldName={"certificateName"}
                label={"Certificate Number"}
                type={"text"}
                error={errorReturn("certificateName")}
                onChange={(e:any) => updateEvent({ certificateName: e.target.value, isFormChanged: true })}
                value={formEvent.certificateName}
            />

            <InputField
                className="m-4"
                fieldName={"dateOfIssue"}
                label={"Date of issue"}
                type={"date"}
                error={errorReturn("dateOfIssue")}
                onChange={(e:any) => updateEvent({ dateOfIssue: e.target.value , isFormChanged: true })}
                value={formEvent.dateOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfExpiry"}
                label={"Date of expiry"}
                type={"date"}
                error={errorReturn("dateOfExpiry")}
                onChange={(e:any) => updateEvent({ dateOfExpiry: e.target.value , isFormChanged: true })}
                value={formEvent.dateOfExpiry}
            />
            <InputField
                className="m-4"
                fieldName={"placeOfIssue"}
                label={"Place of issue"}
                type={"text"}

                error={errorReturn("placeOfIssue")}
                onChange={(e:any) => updateEvent({ placeOfIssue: e.target.value , isFormChanged: true })}
                value={formEvent.placeOfIssue}
            />
            {/* <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
                <Upload className="text-IbColor" />
                <p className="text-IbColor">Upload Certificates PDF</p>
            </div> */}
            <FileUpload folder={"/courseCertificate"} name="certificate" />

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
                                Course Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Certificate Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date of issue
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date of expiry
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Place of issue
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
        {formEvent.isFormChanged ? <button
            type="submit"
            disabled={formEvent.dataList.length === 0}
            // onClick={() => navigate("/dashboard/personaldetails/kinDetail")}
            className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:focus::bg-blue-300  disabled:hover:bg-blue-300 disabled:bg-blue-300"
        >
            Save & next
        </button> :
            <button
                type="button"
               
                className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                   
                    navigate("/dashboard/medicalDetails");
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
    </form>


}
export default CourseCertificate