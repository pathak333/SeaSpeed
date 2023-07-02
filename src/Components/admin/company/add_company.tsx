import { useReducer } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../uiComponents/inputField/inputField.component";
import { ArrowLeft } from "react-feather";
import FileUpload from "../../../uiComponents/inputField/fileUpload.component";




const AddCompany = () => {


 



    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        name: "",
        email: "",
        phone: "",
        Address: "",
        error: { key: "", value: "" },
    })



    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";




    return  <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
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
                    fieldName={"email"}
                    label={"Email"}
                    type={"text"}
                    error={errorReturn("email")}
                    onChange={(e) => updateEvent({ email: e.target.value, isFormChanged: true })}
                    value={formEvent.email}
                />
                <InputField
                    className="m-4"
                    fieldName={"phone"}
                    label={"Phone"}
                    type={"text"}
                    error={errorReturn("phone")}
                    onChange={(e) => updateEvent({ phone: e.target.value, isFormChanged: true })}
                    value={formEvent.phone}
                />
                <InputField
                    className="m-4"
                    fieldName={"Address"}
                    label={"Address"}
                    type={"text"}
                    error={errorReturn("Address")}
                    onChange={(e) => updateEvent({ Address: e.target.value, isFormChanged: true })}
                    value={formEvent.Address}
                />
                <FileUpload folder={"/company"} name="logo" />
                <FileUpload folder={"/company"} name="copmany doc" />
            </div>

     
    

}


export default AddCompany;