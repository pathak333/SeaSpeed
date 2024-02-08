import { useContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";

import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { ContactDetailValidation } from "./validation";
import { ProfileUpdate } from "../../services/user.service";
import InputField from "../../uiComponents/inputField/inputField.component";
import ApproveReject from "../../uiComponents/approve_reject";
import { ProfileUpdateadmin } from "../../services/admin.service";


const ContactDetail = () => {
  const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();

  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');


  const { setState } = useContext(PersonalDetailContext)!;


  const { crew } = location.state != null ? location.state : {crew:null} ;
  console.log(crew);

  // const errorReturn = (field: string) =>
  //     formEvent.error.keys === field ? formEvent.error.values : "";


  useEffect(() => {
    setState(Personalstate.contactDetails);
  }, []);



  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      // email: "",
      // code: "",
      // phone: "",
      alt_email:id!= null ? crew.alt_email ?? "" : globalState.data.data.alt_email || "",
     // alt_country_code: id!= null ? crew.alt_country_code ?? "" : globalState.data.data.alt_country_code || "",
      alt_phone_no: id!= null ? crew.alt_phone_no ?? "" : globalState.data.data.alt_phone_no || "",
      isFormChanged:false
    }
  );

  const clearAll = () => {
   updateEvent( {
   
    alt_email: "",
   // alt_country_code:"",
    alt_phone_no: "",
    isFormChanged:false
  })
 }


  const handlerSubmit = async (event: any) => {
    toast.dismiss();
    console.log("constact ")

    try {
      dispatch({ type: LOADING, payload: true });
      event.preventDefault();
      let formData = { ...formEvent }
      delete formData.isFormChanged
      delete formData.error
      let isValid = await ContactDetailValidation(formData);
      if (isValid) {
        const { data } = await ProfileUpdate(formData);
        if (data.success) { 
          toast.info(data.message)
          navigate("/dashboard/personaldetails/educationDetail");
          
        }
       // dispatch({ type: LOADING, payload: false });

      }else {
        throw Error(isValid)
      }
    } catch (error: any) {
      console.log(error)
      if (error.name === "ValidationError") {
        for (let errorDetail of error.details) {
          updateEvent({
            error: {
              key: errorDetail.context.key,
              values: errorDetail.message,
            },
          });
          console.log(errorDetail.context.key + "======");
          toast.error(errorDetail.message);
        }
      } else if (error.name === "AxiosError")
        toast.error(error.response.data.message);
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
    
  };


  const adminUpdate = async (event: any) => {
    //ProfileUpdateadmin
    event.preventDefault();
    dispatch({ type: LOADING, payload: true });
    const { data } = await ProfileUpdateadmin({alt_email:formEvent.alt_email,alt_phone_no:formEvent.alt_phone_no,_id:id})
    if (data) {
      toast.info(data.message)
      updateEvent({ 'isFormChanged': false })
    }
    dispatch({ type: LOADING, payload: false });
    
}



  return (
    <form onSubmit={handlerSubmit}>
      <h3 className="pl-4 font-semibold">Contact details</h3>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"email"}
          label={"Email"}
          type={"text"}
          disabled={true}
          //   error={errorReturn("firstname")}
          onChange={
            (e) => ""
            //updateEvent({ firstname: e.target.value })
          }
          value={id!= null ? crew.email :globalState.data.data.email}
        />
        <div className="flex flex-row  max-sm:flex-col">
          {/* <InputField
            className="m-4 w-24"
            fieldName={"code"}
            label={"Code"}
            disabled={true}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={
              (e) => ""
              //updateEvent({ firstname: e.target.value })
            }
            value={id!= null ? crew.country_code :globalState.data.data.country_code}
          /> */}
          <InputField
            className="m-4 "
            fieldName={"phone"}
            label={"Phone number"}
            disabled={true}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={
              (e) => ""
              //updateEvent({ firstname: e.target.value })
            }
            value={id!= null ? crew.phone_no : globalState.data.data.phone_no}
          />
        </div>
      </div>
      <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
          className="m-4"
          fieldName={"altemail"}
          label={"Alternate Email"}
          type={"text"}
          //   error={errorReturn("firstname")}
          onChange={(e) => updateEvent({ alt_email: e.target.value,isFormChanged:true })}
          value={formEvent.alt_email}
        />
        <div className="flex flex-row max-sm:flex-col">
          {/* <InputField
            className="m-4 w-24 max-sm:w-100"
            fieldName={"altcode"}
            label={"Code"}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={(e) => updateEvent({ alt_country_code: e.target.value,isFormChanged:true })}
            value={formEvent.alt_country_code }
          /> */}
          <InputField
            className="m-4 "
            fieldName={"alt_phone_no"}
            label={"Alternate phone number"}
            type={"text"}
            //   error={errorReturn("firstname")}
            onChange={(e) => updateEvent({ alt_phone_no: e.target.value,isFormChanged:true })}
            value={formEvent.alt_phone_no}
          />
        </div>
      </div>
      
    
      {id === null && <div>
        {formEvent.isFormChanged ? <button
          type="submit"
          className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save & next
        </button> :
          <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate("/dashboard/personaldetails/educationDetail");
            }}
          >
            Skip and Next
          </button>}
        <button type="button" className="ml-8 text-xl text-blue-700" onClick={() => { clearAll() }}  >Clear all</button>
        <button
          className="ml-8 text-xl text-gray-500"
          onClick={() => navigate("/dashboard/personaldetails")}
        >
          Previous
        </button>
      </div>}
      { globalState.data.data.permission.includes("application") &&
      <div>
      {id!== null && formEvent.isFormChanged && <button type="button" className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={adminUpdate}>Save</button> }
      
      {id!== null && !formEvent.isFormChanged &&  <div id="approver">
         <ApproveReject name="personalDetail" navigation={`/adminDashboard/personaldetails/educationDetail/?id=${id}`} locationStateData={crew}  doc_id="ContactDetail" user_id={id} />
       </div>}
      </div> }
      { (globalState.data.data.permission.includes("admin") || ("vessel") ) && id !== null &&
        <div>
    
           <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/personaldetails/educationDetail/?id=${id}`);
            }}
          >
           Next
          </button>
          </div>
      }
    </form>
  );
};

export default ContactDetail;
