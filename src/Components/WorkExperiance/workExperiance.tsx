import { useReducer } from "react";
import InputField from "../inputField/inputField.component";
import { Trash2 } from "react-feather";
import { toast } from "react-toastify";
import { WorkExperianceValidation } from "./validation";


const WorkExperiance = () => {


    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next }
        return newEvent;
    }, {
        vessel: "",
        vesselType: "",
        flag: "",
        rank: "",
        dwt: "",
        grt: "",
        bhp: "",
        engineType: "",
        startDate: "",
        endDate: "",
        manningAgentsOrOwners: "",
        reason: "",
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
            let isValid = await WorkExperianceValidation(data)
            if (isValid) {
                updateEvent({
                    dataList: [...formEvent.dataList, data],
                    vessel: "",
                    vesselType: "",
                    flag: "",
                    rank: "",
                    dwt: "",
                    grt: "",
                    bhp: "",
                    engineType: "",
                    startDate: "",
                    endDate: "",
                    manningAgentsOrOwners: "",
                    reason: "",
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
            vessel: "",
            vesselType: "",
            flag: "",
            rank: "",
            dwt: "",
            grt: "",
            bhp: "",
            engineType: "",
            startDate: "",
            endDate: "",
            manningAgentsOrOwners: "",
            reason: "",
            dataList: [],
            error: { key: "", value: "" },

        });
    };




    const listofData = formEvent.dataList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b">
            <td className="px-6 py-4">{item.vessel}</td>
            <td className="px-6 py-4">{item.vesselType}</td>
            <td className="px-6 py-4">{item.flag}</td>
            <td className="px-6 py-4">{item.rank}</td>
            <td className="px-6 py-4">{item.dwt}</td>
            <td className="px-6 py-4">{item.grt}</td>
            <td className="px-6 py-4">{item.bhp}</td>
            <td className="px-6 py-4">{item.engineType}</td>
            <td className="px-6 py-4">{item.startDate}</td>
            <td className="px-6 py-4">{item.endDate}</td>
            <td className="px-6 py-4">{item.manningAgentsOrOwners}</td>
            <td className="px-6 py-4">{item.reason}</td>
            <td className="px-6 py-4">{item.dataList}</td>
          
            {/* <td className="px-6 py-4">file</td> */}
            <td className="px-6 py-4">
                <Trash2
                    onClick={() => {
                        formEvent.dataList.splice(index, 1);
                        updateEvent({ visaList: formEvent.visaList });
                    }}
                />
            </td>
        </tr>
    ));





    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";


    return <form >
        <h3 className="pl-4 font-semibold">Bank details</h3>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
                className="m-4"
                fieldName={"vessel"}
                label={"Vessel"}
                type={"text"}
                error={errorReturn("vessel")}
                onChange={(e) => updateEvent({ vessel: e.target.value, isFormChanged: true })}
                value={formEvent.vessel}
            />
            <InputField
                className="m-4"
                fieldName={"vesselType"}
                label={"Vessel type"}
                type={"text"}
                error={errorReturn("vesselType")}
                onChange={(e) => updateEvent({ vesselType: e.target.value, isFormChanged: true })}
                value={formEvent.vesselType}
            />
            <InputField
                className="m-4"
                fieldName={"flag"}
                label={"Flag"}
                type={"text"}
                error={errorReturn("flag")}
                onChange={(e) => updateEvent({ flag: e.target.value, isFormChanged: true })}
                value={formEvent.flag}
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
            <InputField
                className="m-4"
                fieldName={"dwt"}
                label={"DWT"}
                type={"text"}
                error={errorReturn("dwt")}
                onChange={(e) => updateEvent({ dwt: e.target.value, isFormChanged: true })}
                value={formEvent.dwt}
            />
            <InputField
                className="m-4"
                fieldName={"grt"}
                label={"GRT"}
                type={"text"}
                error={errorReturn("grt")}
                onChange={(e) => updateEvent({ grt: e.target.value, isFormChanged: true })}
                value={formEvent.grt}
            />
            <InputField
                className="m-4"
                fieldName={"bhp"}
                label={"BHP"}
                type={"text"}
                error={errorReturn("bhp")}
                onChange={(e) => updateEvent({ bhp: e.target.value, isFormChanged: true })}
                value={formEvent.bhp}
            />
            <InputField
                className="m-4"
                fieldName={"engineType"}
                label={"Engine type"}
                type={"text"}
                error={errorReturn("engineType")}
                onChange={(e) => updateEvent({ engineType: e.target.value, isFormChanged: true })}
                value={formEvent.engineType}
            />
            <InputField
                className="m-4"
                fieldName={"startDate"}
                label={"Start date"}
                type={"date"}
                // error={errorReturn("dob")}
                onChange={(e) => updateEvent({ startDate: e.target.value, isFormChanged: false })}
            />
            <InputField
                className="m-4"
                fieldName={"endDate"}
                label={"End date"}
                type={"date"}
                // error={errorReturn("dob")}
                onChange={(e) => updateEvent({ endDate: e.target.value, isFormChanged: false })}
            />
            <InputField
                className="m-4"
                fieldName={"manningAgentsOrOwners"}
                label={"Manning Agents/owners"}
                type={"text"}
                error={errorReturn("manningAgentsOrOwners")}
                onChange={(e) => updateEvent({ manningAgentsOrOwners: e.target.value, isFormChanged: true })}
                value={formEvent.manningAgentsOrOwners}
            />
            <InputField
                className="m-4"
                fieldName={"reason"}
                label={"Reason of sign-off"}
                type={"text"}
                error={errorReturn("reason")}
                onChange={(e) => updateEvent({ reason: e.target.value, isFormChanged: true })}
                value={formEvent.reason}
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
                                Vessel
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Vessel Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Flag
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                            DWT
                            </th>
                            <th scope="col" className="px-6 py-3">
                            GRT
                            </th>
                            <th scope="col" className="px-6 py-3">
                            BHP
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Engine Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Start Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                            End Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                            manning Agents Or Owners
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Reason
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

    </form>
}
export default WorkExperiance;