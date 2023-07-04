import { useReducer } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../uiComponents/inputField/inputField.component";
import { ArrowLeft } from "react-feather";
import FileUpload from "../../../uiComponents/inputField/fileUpload.component";
import AddManager from "./add_manager";




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




    return <> <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
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
                <AddManager types={""} from={"company"} />
        <div className="flex justify-center m-2">
            <button type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
                Add Manager
            </button>

        </div>
    </>



}


export default AddCompany;