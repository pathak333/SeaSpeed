import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RefrenceValidation } from "./validation";
import { Trash2 } from "react-feather";
import InputField from "../../uiComponents/inputField/inputField.component";
import { addReferences, deletetReferences, getReferences } from "../../services/user.service";
import { useGlobalState } from "../../contexts/global.context";
import { LOADING } from "../../constants/action.constant";
import ApproveReject from "../../uiComponents/approve_reject";
import { getCrewReferences } from "../../services/admin.service";



const References = () => {



    //get query parameters 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');



    const navigate = useNavigate()



    const [globalState, dispatch] = useGlobalState();



    async function fetchData() {
        const { data } =id === null ? await getReferences():await getCrewReferences(id);
        updateEvent({ savedData: data.data })
    }


    useEffect(() => {
        fetchData();
        // setState(TravelState.seamenBook);

    }, [])





    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next }
        return newEvent;
    }, {
        companyName: "",
        address: "",
        personInCharge: "",
        titledOfPersonInCharge: "",
        phoneNumber: "",
        email: "",
        dataList: [],
        savedData: [],
        isFormChanged: false,
        error: { key: "", value: "" },
    })

    const addMore = async () => {
        console.log("Refrence");

        try {
            let data = { ...formEvent }
            delete data.error
            delete data.isFormChanged
            delete data.dataList
            delete data.savedData

            let isValid = await RefrenceValidation(data)
            console.log("IsValid")
            console.log(isValid)
            if (isValid) {
                updateEvent({
                    dataList: [...formEvent.dataList, data],
                    companyName: "",
                    address: "",
                    personInCharge: "",
                    titledOfPersonInCharge: "",
                    phoneNumber: "",
                    email: "",
                    error: { key: "", value: "" },

                })
            } else {
                throw new Error(isValid);
            }
        } catch (error: any) {
            console.log(error);

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
            companyName: "",
            address: "",
            personInCharge: "",
            titledOfPersonInCharge: "",
            phoneNumber: "",
            email: "",
            dataList: [],
            error: { key: "", value: "" },

        });
    };

    const listofData = formEvent.dataList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
            <td className="px-6 py-4">{item.companyName}</td>
            <td className="px-6 py-4">{item.address}</td>
            <td className="px-6 py-4">{item.personInCharge}</td>
            <td className="px-6 py-4">{item.titledOfPersonInCharge}</td>
            <td className="px-6 py-4">{item.phoneNumber}</td>
            <td className="px-6 py-4">{item.email}</td>


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
        <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
            <td className="px-6 py-4">{item.companyName}</td>
            <td className="px-6 py-4">{item.address}</td>
            <td className="px-6 py-4">{item.personInCharge}</td>
            <td className="px-6 py-4">{item.titledOfPersonInCharge}</td>
            <td className="px-6 py-4">{item.phoneNumber}</td>
            <td className="px-6 py-4">{item.email}</td>


            {/* <td className="px-6 py-4">file</td> */}
            <td className="px-6 py-4">
                <Trash2
                    onClick={async () => {
                        try {
                            const { data } = await deletetReferences(item._id)
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
            const { data } = await addReferences(formEvent.dataList);
            if (data.success) {
                toast.info(data.message)
                navigate("/");
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


    return <form onSubmit={handlerSubmit}>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
                className="m-4"
                fieldName={"companyName"}
                label={"Company name"}
                type={"text"}
                error={errorReturn("companyName")}
                onChange={(e) => updateEvent({ companyName: e.target.value, isFormChanged: true })}
                value={formEvent.companyName}
            />
            <InputField
                className="m-4"
                fieldName={"address"}
                label={"Address"}
                type={"text"}
                error={errorReturn("address")}
                onChange={(e) => updateEvent({ address: e.target.value, isFormChanged: true })}
                value={formEvent.address}
            />
            <InputField
                className="m-4"
                fieldName={"personInCharge"}
                label={"person In Charge"}
                type={"text"}
                error={errorReturn("personInCharge")}
                onChange={(e) => updateEvent({ personInCharge: e.target.value, isFormChanged: true })}
                value={formEvent.personInCharge}
            />
            <InputField
                className="m-4"
                fieldName={"titledOfPersonInCharge"}
                label={"Titled of person In Charge"}
                type={"text"}
                error={errorReturn("titledOfPersonInCharge")}
                onChange={(e) => updateEvent({ titledOfPersonInCharge: e.target.value, isFormChanged: true })}
                value={formEvent.titledOfPersonInCharge}
            />
            <InputField
                className="m-4"
                fieldName={"phoneNumber"}
                label={"Phone Number"}
                type={"text"}
                error={errorReturn("phoneNumber")}
                onChange={(e) => updateEvent({ phoneNumber: e.target.value, isFormChanged: true })}
                value={formEvent.phoneNumber}
            />
            <InputField
                className="m-4"
                fieldName={"email"}
                label={"Email"}
                type={"text"}
                error={errorReturn("email")}
                onChange={(e) => updateEvent({ email: e.target.value, isFormChanged: true })}
                value={formEvent.email}
            />
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
                                Company Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Person In Charge
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
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
            {formEvent.isFormChanged ? <button
                type="submit"
                disabled={formEvent.dataList.length === 0}
                // onClick={() => navigate("/dashboard/personaldetails/kinDetail")}
                className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  disabled:focus::bg-blue-300  disabled:hover:bg-blue-300 disabled:bg-blue-300"
            >
                Save & next
            </button> :
                <button
                    type="button"
                    className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => {
                        clearAllData();
                        navigate("/");
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
        { globalState.data.data.permission.includes("application") && 
        <div>
        {id !== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { }}>Save</button>}

        {id !== null && !formEvent.isFormChanged && <div id="approver">
            <ApproveReject name="traveldetails" navigation={`/`} locationStateData={{}}  doc_id="References" user_id={id} />
        </div>}
        </div>}
        { (globalState.data.data.permission.includes("admin") || ("vessel") ) && id !== null &&
        <div>
           <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/allCrewMember/?id=${id}`);
            }}
          >
           Done
          </button>
      </div> }
    </form>
}
export default References