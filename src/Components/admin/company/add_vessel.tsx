

import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../uiComponents/inputField/inputField.component";
import { ArrowLeft } from "react-feather";
import {SearchSelect,createOption} from "../../../uiComponents/inputField/searchSelectInputField.component";
import DialogBox from "../../../uiComponents/dialogBox";
import AddCompany from "./add_company";




const AddVessel = () => {
    const navigate = useNavigate();

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }
    const [isOpen, setIsOpen] = useState(false);

    
    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        error: { key: "", value: "" },
    })


    
    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";

     const onCreate =   (v: any) => {
            console.log(v+"==========================")
            setIsOpen(true)
        }
    
    
    return <>
        {console.log(isOpen+"???????????????????????")}
           <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
                <span className="mr-2">
                    <ArrowLeft onClick={() => goBack()} />
                </span>{" "}
                Add vessel
            </p>
            <p className="pl-8 text-[#A5A5A5]">
            Add new vessel with the required details
            </p>
            <span className="ml-4 text-lg">vessel basic details</span>

            <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
                <InputField
                    className="m-4"
                    fieldName={"name"}
                    label={"Enter name"}
                    type={"text"}
                    error={errorReturn("name")}
                    onChange={(e) => updateEvent({ name: e.target.value, isFormChanged: true })}
                    value={formEvent.name}
                />
                <InputField
                    className="m-4"
                    fieldName={"imoNumber"}
                    label={"IMO Number"}
                    type={"text"}
                    error={errorReturn("imoNumber")}
                    onChange={(e) => updateEvent({ imoNumber: e.target.value, isFormChanged: true })}
                    value={formEvent.imoNumber}
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
                    fieldName={"type"}
                    label={"Type"}
                    type={"text"}
                    error={errorReturn("type")}
                    onChange={(e) => updateEvent({ type: e.target.value, isFormChanged: true })}
                    value={formEvent.type}
                />
                <InputField
                    className="m-4"
                    fieldName={"company"}
                    label={"Company"}
                    type={"text"}
                    error={errorReturn("company")}
                    onChange={(e) => updateEvent({ company: e.target.value, isFormChanged: true })}
                    value={formEvent.company}
                />
                <InputField
                    className="m-4"
                    fieldName={"crewManagerId"}
                    label={"Crew manager"}
                    type={"text"}
                    error={errorReturn("crewManagerId")}
                    onChange={(e) => updateEvent({ crewManagerId: e.target.value, isFormChanged: true })}
                    value={formEvent.crewManagerId}
                />
                <InputField
                    className="m-4"
                    fieldName={"shipManagerId"}
                    label={"Ship manager"}
                    type={"text"}
                    error={errorReturn("shipManagerId")}
                    onChange={(e) => updateEvent({ shipManagerId: e.target.value, isFormChanged: true })}
                    value={formEvent.shipManagerId}
                />
                <SearchSelect
                    className="m-4"
                        
                    label={"Oil tanker DCE"}
                    //type={""}
                    onChange={(e) => updateEvent({ Oil_tanker_DCE: e.target.value, isFormChanged: true })}
                    value={formEvent.Oil_tanker_DCE}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={[createOption("Support"), createOption("Operation"), createOption("Management")]}
                    onCreateOption={onCreate}
                    isDisabled={false}
                    isLoading={false} />
                <DialogBox label="Add New Company" isOpen={isOpen} onClose={() => { setIsOpen(false); } } component={<><AddCompany /></>}/>
            </div></div>
    </>

}


export default AddVessel;