import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RefrenceValidation } from "./validation";
import { Trash2 } from "react-feather";
import InputField from "../inputField/inputField.component";



const References = () => {

    const navigate = useNavigate()

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
        isFormChanged: false,
        error: { key: "", value: "" },
    })

    const addMore = async () => {
        try {
            let data = { ...formEvent }
            delete data.error
            delete data.isFormChanged
            delete data.dataList
            let isValid = await RefrenceValidation(data)
            if (isValid) {
                updateEvent({
                    dataList: [...formEvent.dataList, data],
                    companyName: "",
                    address: "",
                    personInCharge: "",
                    titledOfPersonInCharge: "",
                    phoneNumber: "",
                    email: "",
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
        <tr key={index} className="bg-white border-b">
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



    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";


    return <form >
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
    </form>
}
export default References