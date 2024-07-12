import { useEffect, useReducer, useState } from "react";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { AllVessel, createNewUser, getAllRank, getcrewData, updateCrew } from "../../../services/admin.service";
import { SearchSelect } from "../../../uiComponents/inputField/searchSelectInputField.component";
import { Option } from "../../../types/propes.types";
import { TodayDate } from "../../../constants/values.constants";
import { toast } from "react-toastify";
import { useGlobalState } from "../../../contexts/global.context";
import { LOADING } from "../../../constants/action.constant";
import { ValidationCrew } from "./validation";




const CreateCrewMember = () => {
    const navigate = useNavigate()
    const [, dispatch] = useGlobalState();
    const [vesselOption, updateVesselOption] = useState<Option[]>([]);
    const [rankOption, updateRankOption] = useState<Option[]>([]);

    // const { id="",page="" } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');



    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }

    const createOption = (label: string, value: string) => ({
        label,
        value,
    }) as Option;


    async function fetchRankData() {
        const { data } = await getAllRank();
        if (data.success) {
            console.log(data);
            let rankOptions: Option[] = []
            data.data.map((e: any) => rankOptions.push(createOption(e.name, e._id)))
            updateRankOption(rankOptions)
        }
    }
    async function fetchVesselData() {
        const { data } = await AllVessel();
        //updateEvent({vesselData:data})
        console.log("vessel data", data);
        if (data) {
            let allData: Option[] = [];
            data.data.map((e: any) => allData.push(createOption(e.name, e._id)))
            updateVesselOption(allData)
        }
    }


    async function UpdateCrewData(id: string, datas: any) {
        toast.dismiss();
        dispatch({ type: LOADING, payload: true });
        const { data } = await updateCrew(id, datas);
        if (data) {
            dispatch({ type: LOADING, payload: false });
            toast.info(data.message);
        }
    }




    useEffect(() => {
        fetchRankData();
        fetchVesselData();
        if (id) FetchcrewData();
    }, [])

    async function FetchcrewData() {
        const { data } = await getcrewData(id)
        console.log(data.data);
        if (data.success) {
            updateEvent({
                firstname: data.data.firstname,
                lastname: data.data.lastname,
                email: data.data.email,
                phone_no: data.data.phone_no,
                rank: { label: data.data.rank.label, value: data.data.rank.value },
                vessel: { label: data.data?.vessel?.label ?? undefined, value: data.data?.vessel?.value ?? undefined },
                joiningPort: data.data.joiningPort,
                joiningDate: data.data.joiningDate
            })
        }
    }

    const [formEvent, updateEvent] = useReducer((pre: any, next: any) => {
        let newEvent = { ...pre, ...next };
        return newEvent;
    }, {
        firstname: "",
        lastname: "",
        email: "",
        phone_no: "",
        // code: "",
        rank: "",
        vessel: { label: "vessel", value: "" },
        joiningPort: "",
        joiningDate: "",
        error: { key: "", value: "" },
    })

    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";


    //createNewUser
    const handleSubmit = async (event: any) => {
        toast.dismiss();
        dispatch({ type: LOADING, payload: true });
        try {
            event.preventDefault();
            let formData = { ...formEvent };
            delete formData.error;
            delete formData.isFormChanged;
            console.log(formData);
            if (formData.vessel.value === "") {
                formData.vessel = {}
            }
            const isValid = await ValidationCrew(formData)

            console.log("eeeee");
            console.log(isValid);

            if (isValid) {
                const { data } = id ? await updateCrew(id,formData) : await createNewUser(formData);
                if (data.success) {
                    toast.info(data.message);
                    navigate("/adminDashboard/home")
                }
            }

        } catch (error: any) {
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
        } finally {
            dispatch({ type: LOADING, payload: false });
        }
    }






    return <>
        <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
                <span className="mr-2">
                    <ArrowLeft onClick={() => goBack()} />
                </span>{" "}
                {id ? "Update" : "Create new"} crew member
            </p>
            <p className="pl-8 text-[#A5A5A5]">
                {id ? "Update" : "Create new"} crew member and generate login credentials
            </p>
            <span className="ml-4 text-lg">crew member basic details</span>
            <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">

                <InputField
                    className="m-4"
                    fieldName={"firstname"}
                    label={"Enter first name"}
                    type={"text"}
                    error={errorReturn("firstname")}
                    onChange={(e) => updateEvent({ firstname: e.target.value, isFormChanged: true })}
                    value={formEvent.firstname}
                />
                <InputField
                    className="m-4"
                    fieldName={"lastname"}
                    label={"Enter last name"}
                    type={"text"}
                    error={errorReturn("lastname")}
                    onChange={(e) => updateEvent({ lastname: e.target.value, isFormChanged: true })}
                    value={formEvent.lastname}
                />
                <InputField
                    className="m-4"
                    fieldName={"email"}
                    label={"Email"}
                    type={"text"}
                    error={errorReturn("email")}
                    onChange={(e) => updateEvent({ email: e.target.value.toLowerCase(), isFormChanged: true })}
                    value={formEvent.email}
                    disabled={id ? true : false}
                />
                {/* <InputField
                className="m-4"
                fieldName={"code"}
                label={"Code"}
                type={"text"}
                error={errorReturn("code")}
                onChange={(e) => updateEvent({ code: e.target.value, isFormChanged: true })}
                value={formEvent.code}
                /> */}
                <InputField
                    className="m-4"
                    fieldName={"phone_no"}
                    label={"Phone number"}
                    type={"text"}
                    error={errorReturn("phone_no")}
                    onChange={(e) => updateEvent({ phone_no: e.target.value, isFormChanged: true })}
                    value={formEvent.phone_no}
                    disabled={id ? true : false}
                />
                <SearchSelect
                    className="m-4"

                    label={"Vessel"}
                    //type={""}
                    onChange={(e) => updateEvent({ vessel: e, isFormChanged: true, })}
                    value={formEvent.vessel}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={vesselOption}
                    // onCreateOption={onCreate}
                    isDisabled={false}
                    isLoading={false}
                />
                {/* <InputField
                className="m-4"
                fieldName={"vessel"}
                label={"Enter vessel or ship name"}
                type={"text"}
                error={errorReturn("vessel")}
                onChange={(e) => updateEvent({ vessel: e.target.value, isFormChanged: true })}
                value={formEvent.vessel}
                /> */}
                <SearchSelect
                    className="m-4"

                    label={"Rank"}
                    //type={""}
                    onChange={(e) => updateEvent({ rank: e, isFormChanged: true, })}
                    value={formEvent.rank}
                    //error={errorReturn("Oil_tanker_DCE")}
                    options={rankOption}
                    // onCreateOption={onCreate}
                    isDisabled={false}
                    isLoading={false}
                />
                {/* <InputField
                className="m-4"
                fieldName={"rank"}
                label={"Rank"}
                type={"text"}
                error={errorReturn("rank")}
                onChange={(e) => updateEvent({ rank: e.target.value, isFormChanged: true })}
                value={formEvent.rank}
                /> */}
                <InputField
                    className="m-4"
                    fieldName={"joiningPort"}
                    label={"Joining port"}
                    type={"text"}
                    error={errorReturn("joiningPort")}
                    onChange={(e) => updateEvent({ joiningPort: e.target.value, isFormChanged: true })}
                    value={formEvent.joiningPort}
                />
                <InputField
                    className="m-4"
                    fieldName={"joiningDate"}
                    label={"Joining date"}
                    type={"date"}
                    error={errorReturn("joiningDate")}
                    min={TodayDate}
                    onChange={(e) => updateEvent({ joiningDate: e.target.value, isFormChanged: true })}
                    value={formEvent.joiningDate}
                />





            </div>
            <button
                type="button"
                className="ml-4 text-white tracking-wider font-semibold  focus:ring-1 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800 bg-gradient-to-r from-cyan-600 to-blue-600"
                onClick={(e) => {
                    handleSubmit(e)
                    // clearAllData();
                    //   navigate("/dashboard/courseCertificate");
                }}
            >
                {id ? "Update" : "Create"}  An Crew Account
            </button>
            <button
                type="button"
                className="ml-8 text-xl text-blue-700"
                onClick={() => {
                    //clearAllData();
                }}
            >
                Clear all
            </button>
        </div>

    </>
}
export default CreateCrewMember;