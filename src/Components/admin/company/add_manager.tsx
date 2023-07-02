

import { useReducer } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../uiComponents/inputField/inputField.component";
import SelectInput from "../../../uiComponents/inputField/selectInputField.comonent";


interface Props{
    types: String;
}


const AddManager = (props:Props) => {
    const navigate = useNavigate();

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    
    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        name: "",
        email: "",
        phone: "",
        address: "",
        type: props.types ?? "",
        error: { key: "", value: "" },
    })


    
    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";

    
    
    
    return <>
       {/* <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
                <span className="mr-2">
                    <ArrowLeft onClick={() => goBack()} />
                </span>{" "}
                Add Company Manager
            </p>
            <p className="pl-8 text-[#A5A5A5]">
            Add new company manager with the required details
            </p>
            <span className="ml-4 text-lg">Manager basic details</span> */}

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
                    fieldName={"address"}
                    label={"Address"}
                    type={"text"}
                    error={errorReturn("address")}
                    onChange={(e) => updateEvent({ address: e.target.value, isFormChanged: true })}
                    value={formEvent.address}
            />
            {!props.types && <SelectInput
                className="m-4"
                fieldName={"type"}
                label={"Types"}
                type={""}
                onChange={(e: any) => updateEvent({ type: e.target.value, isFormChanged: true })}
                value={formEvent.type}
                error={errorReturn("type")}
                option={["crew", "ship", "company"]}
            />}
        </div>
        <button
        type="button"
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
         // clearAllData();
        //   navigate("/dashboard/courseCertificate");
        }}
      >
       Save
            </button>
    {/* </div > */}
    </>

}

export default AddManager;