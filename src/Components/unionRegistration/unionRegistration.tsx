import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../uiComponents/inputField/inputField.component";
import { UnionRegistrationValidation } from "./validation";
import { toast } from "react-toastify";
import { Trash2 } from "react-feather";
import { useGlobalState } from "../../contexts/global.context";
import { addUnionRegistration, deletetUnionRegistration, getUnionRegistration } from "../../services/user.service";
import { LOADING } from "../../constants/action.constant";
import { getCrewUnionRegistration } from "../../services/admin.service";
import ApproveReject from "../../uiComponents/approve_reject";

const UnionRegistrationDetail = () => {



  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');




    const navigate = useNavigate()


   
    const [, dispatch] = useGlobalState();



    async function fetchData() {
        const { data } =id === null ? await getUnionRegistration(): await getCrewUnionRegistration(id);
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
        unionName: "",
        membershipNumber: "",
        dateOfJoiningUnion: "",
        rank: "",
        dataList: [],
        savedData: [],
        isFormChanged: false,
        error: { key: "", value: "" },
    })


    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";


    const addMore = async () => {
        try {
            let data = { ...formEvent }
            delete data.error
            delete data.isFormChanged
            delete data.dataList
            delete data.savedData

            let isValid = await UnionRegistrationValidation(data)
            if (isValid) {
                updateEvent({
                    dataList: [...formEvent.dataList, data],
                    unionName: "",
                    membershipNumber: "",
                    dateOfJoiningUnion: "",
                    rank: "",
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
            unionName: "",
            membershipNumber: "",
            dateOfJoiningUnion: "",
            rank: "",
            dataList: [],
            error: { key: "", value: "" },

        });
    };

    const listofData = formEvent.dataList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b">
            <td className="px-6 py-4">{item.unionName}</td>
            <td className="px-6 py-4">{item.membershipNumber}</td>
            <td className="px-6 py-4">{item.dateOfJoiningUnion.split("T")[0]}</td>
            <td className="px-6 py-4">{item.rank}</td>


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
            <td className="px-6 py-4">{item.unionName}</td>
            <td className="px-6 py-4">{item.membershipNumber}</td>
            <td className="px-6 py-4">{item.dateOfJoiningUnion.split("T")[0]}</td>
            <td className="px-6 py-4">{item.rank}</td>


            {/* <td className="px-6 py-4">file</td> */}
            <td className="px-6 py-4">
                <Trash2
                    onClick={async() => {
                        try {
                            const { data } = await deletetUnionRegistration(item._id)
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
            const { data } = await addUnionRegistration(formEvent.dataList);
            if (data.success) {
                toast.info(data.message)
                navigate("/dashboard/references");
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



    return <form onSubmit={handlerSubmit}>

        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
                className="m-4"
                fieldName={"unionName"}
                label={"Union name"}
                type={"text"}
                error={errorReturn("unionName")}
                onChange={(e) => updateEvent({ unionName: e.target.value, isFormChanged: true })}
                value={formEvent.unionName}
            />
            <InputField
                className="m-4"
                fieldName={"membershipNumber"}
                label={"Membership number"}
                type={"text"}
                error={errorReturn("membershipNumber")}
                onChange={(e) => updateEvent({ membershipNumber: e.target.value, isFormChanged: true })}
                value={formEvent.membershipNumber}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfJoiningUnion"}
                label={"Date of joining union"}
                type={"date"}
                error={errorReturn("dateOfJoiningUnion")}
                onChange={(e) => updateEvent({ dateOfJoiningUnion: e.target.value, isFormChanged: true })}
                value={formEvent.dateOfJoiningUnion}
            
            />

            <InputField
                className="m-4"
                fieldName={"rank"}
                label={"Rank"}
                type={"text"}
                error={errorReturn("rank")}
                onChange={(e) => updateEvent({ rank: e.target.value, isFormChanged: true })}
                value={formEvent.rank}
            />

        </div>
        <div className="flex justify-center m-2">
            <button type="button" onClick={() => addMore()} className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
                Add more
            </button>

        </div>
        {formEvent.dataList.length > 0 || formEvent.savedData.length > 0  ? (
            <div className="relative overflow-x-auto mb-3">
                <table className="table-auto w-full text-sm text-left text-grey-500">
                    <thead className="text-xs text-grey-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Union Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Membership Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Of Joining Union
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rank
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
      { id === null && <div>
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
                    clearAllData();
                    navigate("/dashboard/references");
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

        {id!== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{}}>Save</button> }
      
      {id!== null && !formEvent.isFormChanged &&  <div id="approver">
         <ApproveReject name="traveldetails" navigation={`/adminDashboard/references/?id=${id}`} locationStateData={{}}  doc_id="UnionRegistrationDetail" user_id={id} />
       </div>}

    </form>
}
export default UnionRegistrationDetail