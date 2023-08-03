

import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../../uiComponents/inputField/inputField.component";
import { ArrowLeft } from "react-feather";
import { SearchSelect } from "../../../../uiComponents/inputField/searchSelectInputField.component";
import DialogBox from "../../../../uiComponents/dialogBox";
import AddCompany from "../add_company";
import AddManager from "../add_manager";
import { createVessel, getAllCompanyService, getAllManagerByCompanyId } from "../../../../services/admin.service";

import { Option } from "../../../../types/propes.types";
import { vesselJoi } from "../validation";
import { toast } from "react-toastify";



const AddVessel = () => {
    const navigate = useNavigate();
    const [companyOption, updateCompanyOption] = useState<Option[]>([]);
    const [crewManagerOption, updateCrewManagerOption] = useState<Option[]>([]);
    const [shipManagerOption, updateShipManagerOption] = useState<Option[]>([]);

    const createOption = (label: string, value: string) => ({
        label,
        value,
    }) as Option;


    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    useEffect(() => {
        fetchData();
    }, [])



    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        name: "",
        imoNumber: "",
        flag: "",
        type: "",
        company: { label: "Company", value: "" },
        crewManagerId: { label: "crew", value: "" },
        shipManagerId: { label: "ship", value: "" },
        isCompanyOpen: false,
        isCrewOpen: false,
        isShipOpen: false,
        currentDialog: "",
        isFormChanged:false,
        error: { key: "", value: "" },
    })



    const fetchData = async () => {
        const { data } = await getAllCompanyService();
        if (data) {
            let allData: Option[] = [];
            data.data.map((e: any) => allData.push(createOption(e.name, e._id)))
            updateCompanyOption(allData)
        }
    }
    const fetchManagerData = async (id: string) => {
        const { data } = await getAllManagerByCompanyId(id);
        if (data) {
            let allShipData: Option[] = [];
            let allCrewData: Option[] = [];
            let allagencyData: Option[] =[];

            data.data.map((e: any) => e.type === "CREW MANAGER" ? allCrewData.push(createOption(e.name, e._id)) : e.type === "SHIP MANAGER" ? allShipData.push(createOption(e.name, e._id)): allagencyData.push(createOption(e.name, e._id)))
            updateCrewManagerOption(allCrewData)
            updateShipManagerOption(allShipData)
        }
    }


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


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            var formData = { ...formEvent };
            delete formData.isCompanyOpen;
            delete formData.isCrewOpen;
            delete formData.isShipOpen;
            delete formData.currentDialog;
            delete formData.isFormChanged;
            delete formData.error;
            console.log(formData)
            let isValid = await vesselJoi(formData);
            console.log(formData);
            
            if (isValid) {
                const { data } = await createVessel(formData);
                if (data) {
                    toast.success(data.message);
                }
          
                updateEvent({
                    name: "",
                    imoNumber: "",
                    flag: "",
                    type: "",
                    company: { label: "Company", value: "" },
                    crewManagerId: { label: "crew", value: "" },
                    shipManagerId: { label: "ship", value: "" },
                    isCompanyOpen: false,
                    isCrewOpen: false,
                    isShipOpen: false,
                    currentDialog: "",
                    isFormChanged:false,
                    error: { key: "", value: "" },
                });
            }
        } catch (error:any) {
            if (error.name === "ValidationError") {
                for (let errorDetail of error.details) {
                  updateEvent({
                    error: {
                      keys: errorDetail.context.key,
                      values: errorDetail.message,
                    },
                  });
                  toast.error(errorDetail.message);
                }
              } else if (error.name === "AxiosError") {
                toast.error(error.response.data.message);
              }
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
                <SearchSelect
                    className="m-4"

                    label={"Company"}
                    //type={""}
                    onChange={(e) => {
                        console.log(e);

                        updateEvent({ company: e, isFormChanged: true, currentDialog: "company" });
                        fetchManagerData(e.value);
                    }}
                    onInputChange={(e: any) => updateEvent({ currentDialog: "company" })}
                    value={formEvent.company}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={companyOption}
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
                {formEvent.company.value !== "" && <SearchSelect
                    className="m-4"

                    label={"Crew Manager"}
                    //type={""}
                    onChange={(e) => updateEvent({ crewManagerId: e, isFormChanged: true, currentDialog: "crew" })}
                    onInputChange={(e: any) => updateEvent({ currentDialog: "crew" })}
                    value={formEvent.crewManagerId}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={crewManagerOption}
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
                {formEvent.company.value !== "" && <SearchSelect
                    className="m-4"

                    label={"Ship Manager"}
                    //type={""}
                    onChange={(e) => updateEvent({ shipManagerId: e, isFormChanged: true, currentDialog: "ship" })}
                    onInputChange={(e: any) => updateEvent({ currentDialog: "ship" })}
                    value={formEvent.shipManagerId}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={shipManagerOption}
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
                onClick={(e) => {
                    handleSubmit(e);
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