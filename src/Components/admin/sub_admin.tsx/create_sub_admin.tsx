import { useReducer } from "react";
import { ArrowLeft } from "react-feather"
import { useNavigate } from "react-router-dom";
import InputField from "../../../uiComponents/inputField/inputField.component";




const CreateSubAdmin = () => {

    const navigate = useNavigate()

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        error: { key: "", value: "" },
    })

    const errorReturn = (field: string) =>
    formEvent.error.key === field ? formEvent.error.value : "";





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
            </div>
            <p className="ml-4 text-lg">Define access</p>
            <button
        type="button"
        className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
         // clearAllData();
        //   navigate("/dashboard/courseCertificate");
        }}
      >
       Create an admin account
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