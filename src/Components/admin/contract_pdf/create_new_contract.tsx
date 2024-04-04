import { ChangeEvent, useEffect, useReducer, useState } from "react";
import DialogBox from "../../../uiComponents/dialogBox";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { IssuesformattedDate } from "../../../constants/values.constants";
import { AirplaneTicket, Save } from "@mui/icons-material";
import FileUpload from "../../../uiComponents/inputField/fileUpload.component";
import { getAllVesselById, getUserContract, getUserSingleContract, newContract, updateContract } from "../../../services/admin.service";
import { useGlobalState } from "../../../contexts/global.context";
import { LOADING } from "../../../constants/action.constant";
import { toast } from "react-toastify";
import { SearchSelect } from "../../../uiComponents/inputField/searchSelectInputField.component";
import { Option } from "../../../types/propes.types";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    label: string,
    userData?: any,
    contractData?:any
}

export default function CreateContract({ isOpen, label, onClose, userData,contractData }: Props) {
    const [globalState, dispatch] = useGlobalState();
    const id =userData?._id;
    const [vesselListOption, updateVesselListOption] = useState<Option[]>([]);

    const createOption = (label: string, value: string) => ({
        label,
        value,
    }) as Option;
    
    useEffect(() => {
        if (isOpen) {
            fetchData()
            fetchVesselData()
            // console.log(contractData);
            
            // if (contractData) {
                    
            //         const { created_for,start_of_contract,embarkation,embarkation_port,disembarkation,end_of_contract,disembarkation_port,EOC_date,sign_off_request,sign_off_reason,next_available_from,documentId,vessel } = contractData;
            //     updateEvent({
            //         created_for: created_for,
            //         start_of_contract: start_of_contract ??"",
            //         embarkation: embarkation ?? "",
            //         embarkation_port: embarkation_port ?? "",
            //         disembarkation: disembarkation ?? "",
            //         end_of_contract: end_of_contract ?? "",
            //         disembarkation_port: disembarkation_port ?? "",
            //         EOC_date: EOC_date ?? "",
            //         sign_off_request: sign_off_request ?? "",
            //         sign_off_reason: sign_off_reason ?? "",
            //         next_available_from: next_available_from ?? "",
            //         documentId: documentId ?? [],
            //         isFormChanged: false,
            //         vessel: vessel ?? {} })
            // }
    }  

        //   return () => {
        //     second
        //   }
    }, [isOpen])

    async function fetchVesselData() {
        dispatch({ type: LOADING, payload: true });
        const { data } = await getAllVesselById();
        if (data) {
            console.log(data);
        let vesselData: Option[] = [];

        data.data.map((e: any) => vesselData.push(createOption(e.name, e._id)))

        updateVesselListOption(vesselData)
        dispatch({ type: LOADING, payload: false });
        }
      


    }


    const [formEvent, updateEvent] = useReducer((pre: any, next: any) => {
        let newEvent = { ...pre, ...next }
        return newEvent;
    }, {
        created_for: id,
        start_of_contract: "",
        embarkation: "",
        embarkation_port: "",
        disembarkation: "",
        end_of_contract: "",
        disembarkation_port: "",
        EOC_date: "",
        sign_off_request: "",
        sign_off_reason: "",
        next_available_from: "",
        documentId: [],
        isFormChanged: false,
        _id:"",
        vessel:{}

    })

    const getDocId = async (docdata: any) => {
        // updateFileData(docdata)
        const arrId = docdata.map((e: any) => e._id)
        updateEvent({ documentId: [...formEvent.documentId, ...arrId] })
        console.log(arrId);

        // let {data} = await UpdateVessel(location.state.id, { certificate: arrId })
        // setVesselData(data.data);
    }


    const fetchData = async () => {
        dispatch({ type: LOADING, payload: true });
        if (contractData) {
            const { data } = await getUserSingleContract(contractData.contract)
            if (data) {
                console.log(data)
                    
                    updateEvent({
                        created_for: data.data.created_for,
                        start_of_contract: data.data.start_of_contract ?? "",
                        embarkation: data.data.embarkation ?? "",
                        embarkation_port: data.data.embarkation_port ?? "",
                        disembarkation: data.data.disembarkation ?? "",
                        end_of_contract: data.data.end_of_contract ?? "",
                        disembarkation_port: data.data.disembarkation_port ?? "",
                        EOC_date: data.data.EOC_date ?? "",
                        sign_off_request: data.data.sign_off_request ?? "",
                        sign_off_reason: data.data.sign_off_reason ?? "",
                        next_available_from: data.data.next_available_from ?? "",
                        documentId: data.data.documentId ?? [],
                        isFormChanged: false,
                        _id: data.data._id ?? "",
                        vessel: data.data.vessel ?? {}
                    })
                    // updateEvent({ ...data.data[0] })
                
            }
        }
        dispatch({ type: LOADING, payload: false });

    }

    const handleupdateContract = async (e: any) => {
        e.preventDefault();
        delete formEvent.isFormChanged
        dispatch({ type: LOADING, payload: true });
        const { data } = await updateContract(formEvent);
        
        if (data) {
            dispatch({ type: LOADING, payload: false });
            toast.info(data.message)
        } else {
            dispatch({ type: LOADING, payload: false });
        }
        dispatch({ type: LOADING, payload: false });
            
}


    const handleFormSubmit = async (e: any) => {
        // newContract
        console.log("New Contract submit function");
        delete formEvent.isFormChanged
        delete formEvent._id
        e.preventDefault();
        dispatch({ type: LOADING, payload: true });
        const { data } = await newContract(formEvent);
        if (data) {
            dispatch({ type: LOADING, payload: false });
            toast.info(data.message)
        } else {
            dispatch({ type: LOADING, payload: false });
        }
        dispatch({ type: LOADING, payload: false });
    }

    console.log(formEvent);


    return <>
        <DialogBox label={label} isOpen={isOpen} onClose={onClose} componentStyle="w-[70%]" component={
            <>
                <div className="relative">
                    {/* <div className="w-24 h-24 bg-white overflow-hidden rounded-full absolute left-2/4 top-[-25%]">

                    <img src={userData.avatar} alt="" className="relative w-20 h-20 rounded-full " />
                </div> */}
                    <div className="w-20 h-20 p-1 bg-white overflow-hidden rounded-full absolute left-2/4 top-[-25%] transform -translate-x-2/4">
                        <img src={formEvent._id !== "" ? formEvent.created_for?.avatar :userData?.avatar} alt="" className="relative  rounded-full object-cover" />
                    </div>
                    <div className="absolute top-[-50px] right-0">
                        <p className="text-xl  font-semibold leading-none">{formEvent._id !== "" ? `${formEvent.created_for?.firstname} ${formEvent.created_for?.lastname}` :   userData?.firstname + " " + userData?.lastname}</p>
                        <p className="text-sm text-textGrey ">{userData?.rank.label}</p>
                    </div>
                    
                    <div className="grid grid-flow-row grid-cols-2">
                        <InputField
                            className="m-2 "
                            inputClass=" datePlaceholder"
                            fieldName={"start_of_contract"}
                            label={"Start Of Contract"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ start_of_contract: e.target.value, isFormChanged: true })}
                            value={formEvent.start_of_contract?.split("T")[0]}
                        />
                        <InputField
                            className="m-2 "
                            fieldName={"embarkation"}
                            label={"Embarkation"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ embarkation: e.target.value, isFormChanged: true })}
                            value={formEvent.embarkation?.split("T")[0]}
                        />
                    </div>
                    <div className="grid grid-flow-row grid-cols-2 items-center">
                    <InputField
                        className="m-2"
                        fieldName={"embarkation_port"}
                        label={"Embarkation Port"}
                        type={"text"}

                        //error={errorReturn("passportNumber")}
                        onChange={(e) => updateEvent({ embarkation_port: e.target.value, isFormChanged: true })}
                        value={formEvent.embarkation_port}
                    />
                    <SearchSelect
                    className="my-4"

                    label={"Vessel"}
                    //type={""}
                    onChange={(e) => {
                        console.log(e);

                        updateEvent({ vessel: e });
                        //  fetchManagerData(e.value);
                    }}
                    // onInputChange={(e: any) => updateFormEvent({ currentDialog: "company" })}
                    value={formEvent.vessel}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={vesselListOption}
                    // onCreateOption={onCreate}
                    isDisabled={false}
                        isLoading={false} />
                    </div>
                    <div className="grid grid-flow-row grid-cols-2">
                        <InputField
                            className="m-2"
                            fieldName={"disembarkation"}
                            label={"Disembarkation"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ disembarkation: e.target.value, isFormChanged: true })}
                            value={formEvent.disembarkation.split("T")[0]}
                        />
                        <InputField
                            className="m-2"
                            fieldName={"end_of_contract"}
                            label={"End Of Contract(Arrival of home)"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ end_of_contract: e.target.value, isFormChanged: true })}
                            value={formEvent.end_of_contract.split("T")[0]}
                        />
                    </div>
                    <InputField
                        className="m-2"
                        fieldName={"disembarkation_port"}
                        label={"Disembarkation Port"}
                        type={"text"}

                        //error={errorReturn("passportNumber")}
                        onChange={(e) => updateEvent({ disembarkation_port: e.target.value, isFormChanged: true })}
                        value={formEvent.disembarkation_port}
                    />
                    <div className="grid grid-flow-row grid-cols-2">
                        <InputField
                            className="m-2"
                            fieldName={"EOC_date"}
                            label={"EOC Date"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ EOC_date: e.target.value, isFormChanged: true })}
                            value={formEvent.EOC_date.split("T")[0]}
                        />
                        <InputField
                            className="m-2"
                            fieldName={"sign_off_request"}
                            label={"Sign Off Request"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ sign_off_request: e.target.value, isFormChanged: true })}
                            value={formEvent.sign_off_request.split("T")[0]}
                        />
                    </div>

                    <InputField
                        className="m-2"
                        fieldName={"sign_off_reason"}
                        label={"Sign Off Reason"}
                        type={"text"}

                        //error={errorReturn("passportNumber")}
                        onChange={(e) => updateEvent({ sign_off_reason: e.target.value, isFormChanged: true })}
                        value={formEvent.sign_off_reason}
                    />


                    <InputField
                        className="m-2 mt-5 "
                        fieldName={"next_available_from"}
                        label={"Next available from"}
                        type={"date"}
                        //max={IssuesformattedDate}
                        //   error={errorReturn("dateOfIssue")}
                        onChange={(e) => updateEvent({ next_available_from: e.target.value, isFormChanged: true })}
                        value={formEvent.next_available_from.split("T")[0]}
                    />
                </div>
                
                <FileUpload folder={"vessel"} name="Ticket or other" from="admin" dataFun={getDocId} isMultiple={true} className="align-sub inline-flex" />
                {/* <button className=" border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2 hover:text-white hover:bg-[#0075FF] leading-none"><AirplaneTicket /> Send Tickets & Visa</button> */}
                <button onClick={formEvent._id !== "" ? handleupdateContract : handleFormSubmit} className=" border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2 hover:text-white hover:bg-[#0075FF] leading-none"><Save /> {formEvent._id !== "" ? "Update" : "Save"}</button>
            </>} />
    </>
}