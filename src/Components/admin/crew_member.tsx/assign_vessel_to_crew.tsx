import { AirplaneTicket } from "@mui/icons-material"
import { SearchSelect } from "../../../uiComponents/inputField/searchSelectInputField.component";
import { useEffect, useReducer, useState } from "react";
import { assignVessel, getAllVesselById } from "../../../services/admin.service";
import { Option } from "../../../types/propes.types";
import { useGlobalState } from "../../../contexts/global.context";
import { LOADING } from "../../../constants/action.constant";
import InputField from "../../../uiComponents/inputField/inputField.component";
import DialogBox from "../../../uiComponents/dialogBox";
import { toast } from "react-toastify";
import { TodayDate } from "../../../constants/values.constants";
import { isObjectEmpty } from "../../../constants/commonFunction";
import { useNavigate } from "react-router-dom";


interface Props {
    userId: string,
    isVesselAvailable: boolean
}


const AssignVessel = (props: Props) => {

    const navigate = useNavigate();
    function goBack(number:number) {
        navigate(number)
     }


    const [, dispatch] = useGlobalState();

    const [vesselListOption, updateVesselListOption] = useState<Option[]>([]);

    const [formEvent, updateFormEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, { vessel: {}, joiningDate: "", joiningPort: "", isUploadOpen: false, isUnAssign:false })



    useEffect(() => {
        updateFormEvent({ userId: props.userId })
        fetchData();
    }, [])

    const createOption = (label: string, value: string) => ({
        label,
        value,
    }) as Option;

    async function fetchData() {
        dispatch({ type: LOADING, payload: true });
        const { data } = await getAllVesselById();
        console.log(data);
        let vesselData: Option[] = [];

        data.data.map((e: any) => vesselData.push(createOption(e.name, e._id)))

        updateVesselListOption(vesselData)
        dispatch({ type: LOADING, payload: false });
      


    }


  

    async function handleSaveButton() {
        dispatch({ type: LOADING, payload: true });
       
        delete formEvent.isUploadOpen;
        delete formEvent.isUnAssign;

        const { data } = await assignVessel(formEvent);
        console.log(data)
        if (data) {
            updateFormEvent({ isUploadOpen: false })
            toast.success(data.message);
        }
        dispatch({ type: LOADING, payload: false });
        goBack(-2)
    }



    return <>
        {!props.isVesselAvailable ? <button className="border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2" onClick={() => updateFormEvent({ isUploadOpen: true, vessel: {} })}><AirplaneTicket /> Assign Vessel</button>
            : <button className="border border-red-600 bg-red-600 font-bold text-white p-2 rounded-lg mx-2" onClick={() => updateFormEvent({ isUnAssign: true, vessel: {} })}><AirplaneTicket /> UnAssign Vessel</button>}

        <DialogBox label="Assign Vessel" isOpen={formEvent.isUploadOpen} onClose={() => { updateFormEvent({ isUploadOpen: false, }) }} component={
            <>
                <SearchSelect
                    className="my-4"

                    label={"Vessel"}
                    //type={""}
                    onChange={(e) => {
                        console.log(e);

                        updateFormEvent({ vessel: e });
                        //  fetchManagerData(e.value);
                    }}
                    // onInputChange={(e: any) => updateFormEvent({ currentDialog: "company" })}
                    value={formEvent.company}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={vesselListOption}
                    // onCreateOption={onCreate}
                    isDisabled={false}
                    isLoading={false} />

                <div className="columns-2 gap-1">
                    <InputField fieldName={"joiningPort"} label={"joiningPort"} type={"text"} onChange={(e) => updateFormEvent({ joiningPort: e.target.value })} />
                    <InputField fieldName={"joiningDate"} label={"joiningDate"} type={"date"} min={TodayDate} onChange={(e) => updateFormEvent({ joiningDate: e.target.value })} />
                </div>
                <button type="button" disabled={isObjectEmpty(formEvent.vessel)} className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold py-2 px-4 rounded" onClick={handleSaveButton}>Save</button>

                {/* <p className="text-IbColor">Upload {props.name} PDF</p> */}
            </>
        } />
        <DialogBox label="Assign Vessel" isOpen={formEvent.isUnAssign} onClose={() => { updateFormEvent({ isUnAssign: false, }) }} component={
            <>
                <p>Do you realy want to unAssign this user?</p>
                <button type="button" className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold py-2 px-4 rounded" onClick={handleSaveButton}>UnAssign</button>
            </>
        } />
    </>
}



export default AssignVessel;