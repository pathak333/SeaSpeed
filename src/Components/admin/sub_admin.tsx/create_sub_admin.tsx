import { useEffect, useReducer, useState } from "react";
import { ArrowLeft } from "react-feather"
import { useNavigate } from "react-router-dom";
import InputField from "../../../uiComponents/inputField/inputField.component";
import Select from 'react-select'
import { AddSubAdmin, AllVessel } from "../../../services/admin.service";

import { Option } from "../../../types/propes.types";
import { toast } from "react-toastify";
import { useGlobalState } from "../../../contexts/global.context";
import { LOADING } from "../../../constants/action.constant";
import { SubAdminValidation } from "./validation";


const CreateSubAdmin = () => {
    const [, dispatch] = useGlobalState();
    const navigate = useNavigate();
    const [vesselOption, updateVesselOption] = useState<Option[]>([])

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }

    useEffect(() => {
        fetchData();
    }, [])


    async function fetchData() {
        const { data } = await AllVessel();
        //updateEvent({vesselData:data})
        console.log("vessel data", data);
        if (data) {
            let allData: Option[] = [];
            data.data.map((e: any) => allData.push(createOption(e.name, e._id)))
            updateVesselOption(allData);
        }
    }



    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        firstname: "",
        lastname: "",
        email: "",
        phone_no: "",
        code: "",
        permission: [],
        otherPermission: {},
        error: { key: "", value: "" },
    })


    function addRemovePermission(value: string, state: boolean) {
        if (state) {
            if (!formEvent.permission.includes(value)) {
                updateEvent({ permission: [...formEvent.permission, value] })
            }
            setTimeout(() => {
                console.log("per", formEvent.permission);
            }, 2000);

        } else {



            formEvent.permission.splice(formEvent.permission.indexOf(value), 1);
            updateEvent({ permission: [...formEvent.permission] })
            setTimeout(() => {
                console.log("per2", formEvent.permission);
            }, 2000);
        }
    }


    function onselectionchange(e: any) {
        console.log(e);
        updateEvent({
            otherPermission: { "vessel": e }
        })
    }

    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";

    const createOption = (label: string, value: string) => ({
        label,
        value,
    }) as Option;


    const handleSubmit = async (event: any) => {
        toast.dismiss();
        dispatch({ type: LOADING, payload: true });
        try {
           console.log("eeeee");
           
           event.preventDefault();
            let formData = { ...formEvent };
            delete formData.error;
            delete formData.isFormChanged;
            console.log(formData);
           
           const isValid = await SubAdminValidation(formData)
           console.log("eeeee");
            console.log(isValid);
            
            if (isValid) {
                console.log(formData);
                const { data } = await AddSubAdmin(formData);
                if (data.success) {
                    toast.info(data.message);
                    navigate("/adminDashboard/home")
                    updateEvent({
                        firstname: "",
                        lastname: "",
                        email: "",
                        phone_no: "",
                        code: "",
                        permission: [],
                        otherPermission: {},
                        error: { key: "", value: "" },
                    })
                }
            }else {
        console.log(isValid);


        throw Error(isValid);
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
                Create sub admin
            </p>
            <p className="pl-8 text-[#A5A5A5]">
                Create new admin and generate login credentials
            </p>
            <span className="ml-4 text-lg">Admin basic details</span>

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
                    onChange={(e) => updateEvent({ email: e.target.value, isFormChanged: true })}
                    value={formEvent.email}
                />
                <InputField
                    className="m-4"
                    fieldName={"phone_no"}
                    label={"Phone number"}
                    type={"text"}
                    error={errorReturn("phone_no")}
                    onChange={(e) => updateEvent({ phone_no: e.target.value, isFormChanged: true })}
                    value={formEvent.phone_no}
                />
                <InputField
                    className="m-4 "
                    fieldName={"code"}
                    label={"Country Code"}
                   
                    type={"text"}
                    //   error={errorReturn("firstname")}
                    onChange={
                        (e) =>  updateEvent({ code: e.target.value, isFormChanged: true  })
                    }
                    value={formEvent.code}
                />
            </div>

            <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 content-center">
                <div>
                    <p className="ml-4 text-lg">Define access</p>
                    <div className="flex ml-2">
                        <div className="permission border-r-2 border-gray-500 w-fit  my-3 px-2">
                            <input className="m-2" type="checkbox" id="user" onChange={(e: any) => {


                                addRemovePermission("admin", e.target.checked);
                            }} />
                            <label htmlFor="user">Admin</label>
                        </div>
                        <div className="permission border-r-2 border-gray-500 w-fit  my-3 px-2">
                            <input className="m-2" type="checkbox" name="company" id="company" onChange={(e: any) => {


                                addRemovePermission("application", e.target.checked);
                            }} />
                            <label htmlFor="company">Application</label>
                        </div>

                        <div className="permission border-r-2 border-gray-500 w-fit  my-3 px-2">
                            <input className="m-2" type="checkbox" name="company" id="company" onChange={(e: any) => {


                                addRemovePermission("vessel", e.target.checked);
                            }} />
                            <label htmlFor="company">Vessel Manager</label>
                        </div>
                        {/* <div className="permission border-r-2 border-gray-500 w-fit  my-3 px-2">
                            <input className="m-2" type="checkbox" name="rank" id="rank" onChange={(e: any) => {


                                addRemovePermission("rank", e.target.checked);
                            }} />
                            <label htmlFor="rank">Rank</label>
                        </div> */}

                    </div>
                </div>
                <div>

                    <p className="ml-4 text-lg pb-3">All Vessel</p>
                    <div className="flex flex-row  ml-4">
                        <Select
                            id="vessel"
                            // defaultValue={}
                            isMulti
                            name="colors"
                            options={vesselOption}
                            className="basic-multi-select w-full"
                            classNamePrefix="select"
                            onChange={(e) => { onselectionchange(e) }}
                        />
                    </div>
                </div>
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
                Create account
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
export default CreateSubAdmin;