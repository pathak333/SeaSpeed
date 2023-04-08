import { useReducer } from "react";
import InputField from "../inputField/inputField.component";


const CertificateOfCompetency = () => {

    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        grade: "",
        licenseNumber: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        placeOfIssue: "",
        issuingAuthorityCountry: "",
        isFormChanged:false,
        error: { keys: "", values: "" },
    })

    const errorReturn = (field: string) =>
    formEvent.error.keys === field ? formEvent.error.values : "";



    return <form>
        <h3 className="pl-4 font-semibold">Bank details</h3>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"bank_name"}
          label={"Bank name"}
          type={"text"}
          error={errorReturn("bank_name")}
          onChange={(e) => updateEvent({ bank_name: e.target.value,isFormChanged:true })}
          value={formEvent.bank_name}
        />
        </div>
    </form>
}

export default CertificateOfCompetency;