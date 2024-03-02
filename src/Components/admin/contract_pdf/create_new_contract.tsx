import { ChangeEvent, useEffect, useReducer } from "react";
import DialogBox from "../../../uiComponents/dialogBox";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { IssuesformattedDate } from "../../../constants/values.constants";
import { AirplaneTicket, Save } from "@mui/icons-material";
import FileUpload from "../../../uiComponents/inputField/fileUpload.component";
import { getUserContract, newContract } from "../../../services/admin.service";
import { useGlobalState } from "../../../contexts/global.context";
import { LOADING } from "../../../constants/action.constant";
import { toast } from "react-toastify";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    label: string,
    userData: any
}

export default function CreateContract({ isOpen, label, onClose, userData }: Props) {
    const [globalState, dispatch] = useGlobalState();
    const id =userData._id;

    useEffect(() => {
        if (isOpen) {
            fetchData()
    }  

        //   return () => {
        //     second
        //   }
    }, [isOpen])




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
        isFormChanged: false

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
        const { data } = await getUserContract(id)
        if (data) {
            console.log(data.data[0]);
            
            updateEvent({...data.data[0]})
        }
        dispatch({ type: LOADING, payload: false });

    }




    const handleFormSubmit = async (e: any) => {
        // newContract
        console.log("New Contract submit function");
        delete formEvent.isFormChanged
        e.preventDefault();
        dispatch({ type: LOADING, payload: true });
        const { data } = await newContract(formEvent);
        if (data) {
            dispatch({ type: LOADING, payload: false });
            toast.info(data.message)
        } else {
            dispatch({ type: LOADING, payload: false });
        }

    }



    return <>
        <DialogBox label={label} isOpen={isOpen} onClose={onClose} componentStyle="w-[70%]" component={
            <>
                <div className="relative">
                    {/* <div className="w-24 h-24 bg-white overflow-hidden rounded-full absolute left-2/4 top-[-25%]">

                    <img src={userData.avatar} alt="" className="relative w-20 h-20 rounded-full " />
                </div> */}
                    <div className="w-20 h-20 p-1 bg-white overflow-hidden rounded-full absolute left-2/4 top-[-25%] transform -translate-x-2/4">
                        <img src={userData.avatar} alt="" className="relative  rounded-full object-cover" />
                    </div>
                    <div className="absolute top-[-50px] right-0">
                        <p className="text-xl  font-semibold leading-none">{userData.firstname} {userData.lastname}</p>
                        <p className="text-sm text-textGrey ">{userData.rank.label}</p>
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
                            value={formEvent.start_of_contract && formEvent.start_of_contract.split("T")[0]}
                        />
                        <InputField
                            className="m-2 "
                            fieldName={"embarkation"}
                            label={"Embarkation"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ embarkation: e.target.value, isFormChanged: true })}
                            value={formEvent.embarkation && formEvent.embarkation.split("T")[0]}
                        />
                    </div>

                    <InputField
                        className="m-2"
                        fieldName={"embarkation_port"}
                        label={"Embarkation Port"}
                        type={"text"}

                        //error={errorReturn("passportNumber")}
                        onChange={(e) => updateEvent({ embarkation_port: e.target.value, isFormChanged: true })}
                        value={formEvent.embarkation_port}
                    />
                    <div className="grid grid-flow-row grid-cols-2">
                        <InputField
                            className="m-2"
                            fieldName={"disembarkation"}
                            label={"Disembarkation"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ disembarkation: e.target.value, isFormChanged: true })}
                            value={formEvent.disembarkation && formEvent.disembarkation.split("T")[0]}
                        />
                        <InputField
                            className="m-2"
                            fieldName={"end_of_contract"}
                            label={"End Of Contract(Arrival of home)"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ end_of_contract: e.target.value, isFormChanged: true })}
                            value={formEvent.end_of_contract && formEvent.end_of_contract.split("T")[0]}
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
                            value={formEvent.EOC_date && formEvent.EOC_date.split("T")[0]}
                        />
                        <InputField
                            className="m-2"
                            fieldName={"sign_off_request"}
                            label={"Sign Off Request"}
                            type={"date"}
                            //max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => updateEvent({ sign_off_request: e.target.value, isFormChanged: true })}
                            value={formEvent.sign_off_request && formEvent.sign_off_request.split("T")[0]}
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
                        value={formEvent.next_available_from && formEvent.next_available_from.split("T")[0]}
                    />
                </div>
                <FileUpload folder={"vessel"} name="Ticket or other" from="admin" dataFun={getDocId} isMultiple={true} className="align-sub inline-flex" />
                {/* <button className=" border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2 hover:text-white hover:bg-[#0075FF] leading-none"><AirplaneTicket /> Send Tickets & Visa</button> */}
                <button onClick={handleFormSubmit} className=" border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2 hover:text-white hover:bg-[#0075FF] leading-none"><Save /> Save</button>
            </>} />
    </>
}