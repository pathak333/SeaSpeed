

import { useReducer } from "react";
import { useNavigate } from "react-router-dom"
import InputField from "../../../uiComponents/inputField/inputField.component";
import SelectInput from "../../../uiComponents/inputField/selectInputField.comonent";
import { managerJoi } from "./validation";
import { toast } from "react-toastify";
import { addManagerService } from "../../../services/admin.service";


interface Props{
    types?: String;
    from: String;
    company?: string;
    callback?: (data: any) => void;
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
        type: props.types ?? "CREW MANAGER",
        ...(props.from === "company" ? {} : { company: props.company }),
        isFormChanged:false,
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
                option={["CREW MANAGER", "SHIP MANAGER", "CREW AGENCY"]}
            />}
        </div>
        <div className="flex justify-center m-2">
            <button type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={async (e:any) => {
                    e.preventDefault();
                    try {
                        var formData = { ...formEvent }
                        delete formData.error;
                        delete formData.isFormChanged
                        var isValid = await managerJoi(formData);
                        if (isValid) {
                            if (props.callback != null) {
                                props.callback(formData);
                            } else {
                                const { data } = await addManagerService(formData);
                                if (data) {
                                    toast.success(data.message);
                                }
                          }
                            updateEvent({
                                name: "",
                                email: "",
                                phone: "",
                                address: "",
                                ...(props.from === "company" ? {} : { company: props.company }),
                                type: props.types ?? "CREW MANAGER",
                                isFormChanged:false,
                                error: { key: "", value: "" },
                            })
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
                }} >
                Add Manager
            </button>

        </div>
    {/* </div > */}
    </>

}

export default AddManager;