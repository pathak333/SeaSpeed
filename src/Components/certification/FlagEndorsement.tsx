import { useReducer } from "react";
import { Upload } from "react-feather";
import InputField from "../inputField/inputField.component";

const FlagEndorsement = () => {
    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        name: "",
        number: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        placeOfIssue: "",
        issuingAuthorityCountry: "",
        isFormChanged: false,
        error: { keys: "", values: "" },
    })

    const errorReturn = (field: string) =>
        formEvent.error.keys === field ? formEvent.error.values : "";



    return <form>
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
                onChange={(e) => updateEvent({ placeOfIssue: e.target.value })}
                value={formEvent.placeOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfIssue"}
                label={"Date of issue"}
                type={"date"}
                error={errorReturn("dateOfIssue")}
                onChange={(e) => updateEvent({ dateOfIssue: e.target.value })}
                value={formEvent.dateOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfExpiry"}
                label={"Date of expiry"}
                type={"date"}
                error={errorReturn("dateOfExpiry")}
                onChange={(e) => updateEvent({ dateOfExpiry: e.target.value })}
                value={formEvent.dateOfExpiry}
            />
           
             <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
            <Upload className="text-IbColor" />
            <p className="text-IbColor">Upload Passport PDF</p>
            </div>
           

        </div>
    </form>
}
export default FlagEndorsement