import { useReducer } from "react";
import InputField from "../inputField/inputField.component";


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
        isFormChanged: false,
        error: { keys: "", values: "" },
    })


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
        });
    };
    const errorReturn = (field: string) =>
        formEvent.error.keys === field ? formEvent.error.values : "";


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
                onChange={(e) => updateEvent({vesselType : e.target.value, isFormChanged: true })}
                value={formEvent.vesselType}
            />
            <InputField
                className="m-4"
                fieldName={"flag"}
                label={"Flag"}
                type={"text"}
                error={errorReturn("flag")}
                onChange={(e) => updateEvent({flag : e.target.value, isFormChanged: true })}
                value={formEvent.flag}
            />
            <InputField
                className="m-4"
                fieldName={"rank"}
                label={"Rank"}
                type={"text"}
                error={errorReturn("rank")}
                onChange={(e) => updateEvent({rank : e.target.value, isFormChanged: true })}
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
                label={"Bank name"}
                type={"text"}
                error={errorReturn("startDate")}
                onChange={(e) => updateEvent({ startDate: e.target.value, isFormChanged: true })}
                value={formEvent.startDate}
            />
            <InputField
                className="m-4"
                fieldName={"endDatemanningAgentsOrOwners"}
                label={"Bank name"}
                type={"text"}
                error={errorReturn("endDatemanningAgentsOrOwners")}
                onChange={(e) => updateEvent({ endDatemanningAgentsOrOwners: e.target.value, isFormChanged: true })}
                value={formEvent.endDatemanningAgentsOrOwners}
            />
            <InputField
                className="m-4"
                fieldName={"manningAgentsOrOwners"}
                label={"Bank name"}
                type={"text"}
                error={errorReturn("manningAgentsOrOwners")}
                onChange={(e) => updateEvent({ manningAgentsOrOwners: e.target.value, isFormChanged: true })}
                value={formEvent.manningAgentsOrOwners}
            />
            <InputField
                className="m-4"
                fieldName={"reason"}
                label={"Bank name"}
                type={"text"}
                error={errorReturn("reason")}
                onChange={(e) => updateEvent({ reason: e.target.value, isFormChanged: true })}
                value={formEvent.reason}
            />
          
        </div>
    </form>
}
export default WorkExperiance;