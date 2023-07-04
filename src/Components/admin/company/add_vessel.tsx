

import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../uiComponents/inputField/inputField.component";
import { ArrowLeft } from "react-feather";
import { SearchSelect, createOption } from "../../../uiComponents/inputField/searchSelectInputField.component";
import DialogBox from "../../../uiComponents/dialogBox";
import AddCompany from "./add_company";
import AddManager from "./add_manager";




const AddVessel = () => {
    const navigate = useNavigate();

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }
 


    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        company:"",
        isCompanyOpen: false,
        isCrewOpen: false,
        isShipOpen: false,
        currentDialog: "",
        error: { key: "", value: "" },
    })



    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";



    const onCreate = (v: any) => {
        console.log(v + "==========================")
        if (formEvent.currentDialog === "company") {
            updateEvent({ isCompanyOpen: true })
        } else if (formEvent.currentDialog === 'crew') {
            updateEvent({ isCrewOpen: true })
        } else if (formEvent.currentDialog === 'ship') {
            updateEvent({ isShipOpen: true })
        }
    }


    return <>

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
            <span className="ml-4 text-lg">vessel basic details {formEvent.currentDialog} {formEvent.company}</span>

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
                <SearchSelect
                    className="m-4"

                    label={"Company"}
                    //type={""}
                    onChange={(e) => updateEvent({ company: e.target.value, isFormChanged: true, currentDialog: "company" })}
                    onInputChange={(e: any) => updateEvent({ currentDialog: "company" })}
                    value={formEvent.company}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={[createOption("Support"), createOption("Operation"), createOption("Management")]}
                    onCreateOption={onCreate}
                    isDisabled={false}
                    isLoading={false} />
                {/* <InputField
                    className="m-4"
                    fieldName={"company"}
                    label={"Company"}
                    type={"text"}
                    error={errorReturn("company")}
                    onChange={(e) => updateEvent({ company: e.target.value, isFormChanged: true })}
                    value={formEvent.company}
                /> */}
               {formEvent.company && <SearchSelect
                    className="m-4"

                    label={"Crew Manager"}
                    //type={""}
                    onChange={(e) => updateEvent({ crewManager: e.target.value, isFormChanged: true, currentDialog: "crew" })}
                    onInputChange={(e: any) => updateEvent({ currentDialog: "crew" })}
                    value={formEvent.crewManager}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={[createOption("Support"), createOption("Operation"), createOption("Management")]}
                    onCreateOption={onCreate}
                    isDisabled={false}
                    isLoading={false} />}
                {/* <InputField
                    className="m-4"
                    fieldName={"crewManagerId"}
                    label={"Crew manager"}
                    type={"text"}
                    error={errorReturn("crewManagerId")}
                    onChange={(e) => updateEvent({ crewManagerId: e.target.value, isFormChanged: true })}
                    value={formEvent.crewManagerId}
                /> */}
                {formEvent.company && <SearchSelect
                    className="m-4"

                    label={"Ship Manager"}
                    //type={""}
                    onChange={(e) => updateEvent({ shipManager: e.target.value, isFormChanged: true, currentDialog: "ship" })}
                    onInputChange={(e: any) => updateEvent({ currentDialog: "ship" })}
                    value={formEvent.shipManager}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={[createOption("Support"), createOption("Operation"), createOption("Management")]}
                    onCreateOption={onCreate}
                    isDisabled={false}
                    isLoading={false} />}
                {/* <InputField
                    className="m-4"
                    fieldName={"shipManagerId"}
                    label={"Ship manager"}
                    type={"text"}
                    error={errorReturn("shipManagerId")}
                    onChange={(e) => updateEvent({ shipManagerId: e.target.value, isFormChanged: true })}
                    value={formEvent.shipManagerId}
                /> */}

                <DialogBox label="Add New Company" isOpen={formEvent.isCompanyOpen} onClose={() => { updateEvent({ isCompanyOpen: false }); }} component={<><AddCompany /></>} />
                <DialogBox label="Add New crew manager" isOpen={formEvent.isCrewOpen} onClose={() => { updateEvent({ isCrewOpen: false }); }} component={<><AddManager types={"crew"} from="popup" /></>} />
                <DialogBox label="Add New ship manager" isOpen={formEvent.isShipOpen} onClose={() => { updateEvent({ isShipOpen: false }); }} component={<><AddManager types={"ship"} from="popup" /></>} />
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
        </div>
    </>

}


export default AddVessel;