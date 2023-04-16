import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../inputField/inputField.component";
import { UnionRegistrationValidation } from "./validation";
import { toast } from "react-toastify";
import { Trash2 } from "react-feather";

const UnionRegistrationDetail = () => {

    const navigate = useNavigate()

    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next }
        return newEvent;
    }, {
        unionName: "",
        membershipNumber: "",
        dateOfJoiningUnion: "",
        rank: "",
        dataList: [],
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
            <td className="px-6 py-4">{item.dateOfJoiningUnion}</td>
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




    return <form >

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
                onChange={(e) => updateEvent({ dateOfJoiningUnion: e.target.value, isFormChanged: false })}
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
        {formEvent.dataList.length > 0 ? (
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
                </table>
            </div>
        ) : (
            <div></div>
        )}
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
                    navigate("/dashboard/courseCertificate");
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
export default UnionRegistrationDetail