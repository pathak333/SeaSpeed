import { useEffect, useReducer, useState } from "react";
import { ArrowLeft } from "react-feather"
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../../../uiComponents/inputField/inputField.component";
import Select from 'react-select'
import { AddSubAdmin, AllVessel, updateSubAdmin } from "../../../services/admin.service";

import { Option } from "../../../types/propes.types";
import { toast } from "react-toastify";
import { useGlobalState } from "../../../contexts/global.context";
import { LOADING } from "../../../constants/action.constant";
import { SubAdminValidation } from "./validation";


const CreateSubAdmin = () => {
    const [, dispatch] = useGlobalState();
    const navigate = useNavigate();
    const location = useLocation();
    const [vesselOption, updateVesselOption] = useState<Option[]>([])

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }



    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        firstname: "",
        lastname: "",
        email: "",
        phone_no: "",
       // code: "",
        permission: [],
        otherPermission: {},
        error: { key: "", value: "" },
        isFormChanged:false
    })

    useEffect(() => {
        let data =location.state ? location.state.admin : null;
        console.log(data);
        
        if (data) {
            updateEvent({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone_no: data.phone_no,
               // code: "",
                permission: data.permission,
                otherPermission: data.hasOwnProperty('otherPermission') ? data.otherPermission : {} ,
                error: { key: "", value: "" },
                isFormChanged:false
            })
            
        }
       
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
        event.preventDefault();
        toast.dismiss();
        dispatch({ type: LOADING, payload: true });
        try {
           console.log("eeeee");
           
            let formData = { ...formEvent };
            delete formData.error;
            delete formData.isFormChanged;
            console.log(formData);
           
           const isValid = await SubAdminValidation(formData)
           console.log("qqqeeeee");
            console.log(isValid);
            
            if (isValid) {
                console.log(formData);
                
                const { data } = location.state && location.state.admin ? await updateSubAdmin(location.state.admin._id,formData) : await AddSubAdmin(formData);
                if (data.success) {
                    toast.info(data.message);
                    navigate("/adminDashboard/home")
                    updateEvent({
                        firstname: "",
                        lastname: "",
                        email: "",
                        phone_no: "",
                      //  code: "",
                        permission: [],
                        otherPermission: {},
                        error: { key: "", value: "" },
                        isFormChanged:false
                    })
                }
            }else {
        console.log(isValid);


        throw Error(isValid);
      }

         


        } catch (error: any) {
            console.log(error)
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
                {/* <InputField
                    className="m-4 "
                    fieldName={"code"}
                    label={"Country Code"}
                   
                    type={"text"}
                    //   error={errorReturn("firstname")}
                    onChange={
                        (e) =>  updateEvent({ code: e.target.value, isFormChanged: true  })
                    }
                    value={formEvent.code}
                /> */}
            </div>

            <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 content-center">
                <div>
                    <p className="ml-4 text-lg">Define access</p>
                    <div className="flex ml-2">
                        <div className="permission border-r-2 border-gray-500 w-fit  my-3 px-2">
                            <input className="m-2" type="checkbox" id="user" onChange={(e: any) => {
                                updateEvent({isFormChanged:true})

                                addRemovePermission("admin", e.target.checked);
                            }} checked={formEvent.permission.includes("admin")} />
                            <label htmlFor="user">Admin</label>
                        </div>
                        <div className="permission border-r-2 border-gray-500 w-fit  my-3 px-2">
                            <input className="m-2" type="checkbox" name="application" id="application" onChange={(e: any) => {

                                updateEvent({isFormChanged:true})
                                addRemovePermission("application", e.target.checked);
                            }} checked={formEvent.permission.includes("application")} />
                            <label htmlFor="application">Application</label>
                        </div>

                        <div className="permission border-r-2 border-gray-500 w-fit  my-3 px-2">
                            <input className="m-2" type="checkbox" name="vessel" id="vessel" onChange={(e: any) => {

                                updateEvent({isFormChanged:true})
                                addRemovePermission("vessel", e.target.checked);
                            }} checked={formEvent.permission.includes("vessel")} />
                            <label htmlFor="vessel">Vessel Manager</label>
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
                            onChange={(e) => { onselectionchange(e);   updateEvent({isFormChanged:true}) }}
                            value={formEvent.otherPermission.hasOwnProperty('vessel') ? formEvent.otherPermission.vessel : ""}
                        />
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="ml-4 text-white tracking-wider font-semibold  focus:ring-1 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2  focus:outline-none dark:focus:ring-blue-800 bg-gradient-to-r from-cyan-600 to-blue-600"
                onClick={(e) => {
                    handleSubmit(e);
                    // clearAllData();
                    //   navigate("/dashboard/courseCertificate");
                }}
            >Create Account
                {/* {location.state}
                {location.state.admin ? 'Update Admin' : 'Create account'} */}
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