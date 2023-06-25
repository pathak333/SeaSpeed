

import { useReducer } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../uiComponents/inputField/inputField.component";
import { ArrowLeft } from "react-feather";




const AddManager = () => {
    const navigate = useNavigate();

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    
    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        error: { key: "", value: "" },
    })


    
    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";

    
    
    
    return <>
       <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
                <span className="mr-2">
                    <ArrowLeft onClick={() => goBack()} />
                </span>{" "}
                Add Company Manager
            </p>
            <p className="pl-8 text-[#A5A5A5]">
            Add new company manager with the required details
            </p>
            <span className="ml-4 text-lg">Manager basic details</span>

            <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
                <InputField
                    className="m-4"
                    fieldName={"firstname"}
                    label={"Enter first name"}
                    type={"text"}
                    error={errorReturn("firstname")}
                    onChange={(e) => updateEvent({ firstname: e.target.value, isFormChanged: true })}
                    value={formEvent.firstname}
                /></div></div>
    </>

}

export default AddManager;