import { ArrowLeft } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import DasboardCardLayout from "../../dashboard/dashboard_card_layout";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { useGlobalState } from "../../../contexts/global.context";
import { useReducer } from "react";
import AddCompany from "./add_company";




 const CompanyProfile = () =>{
    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    },
 console.log("crew profile time"))
   
   const navigate = useNavigate();
   function goBack() {
      navigate(-1)
   }
    const addMoreManager = (data: any) => {
    formEvent.manager.push(data);
    updateEvent({manager:formEvent.manager})

    }

    return <div className="">
<div id="companyProfile" className="main  w-full">

      <div className="pl-8 box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px] flex flex-col justify-center items-start ">
         <p className="font-medium text-[22px] leading-none flex flex-row  items-start justify-start">
            <span className="mr-2">
               <ArrowLeft onClick={() => {goBack() }} />
            </span>
                SeaSpeed Marine LLP Profile
         </p>
         <p className="pl-8 text-[#A5A5A5] pb-3">
                Number of vessels will be Displayed Here
         </p>
         
         <div className="pl-10 flex flex-row items-center justify-center content-center">
         <div id="pic" className="w-20 h-20 bg-slate-300 rounded-full"></div>
            <div className="h-10 pb-20">
              <p className="mx-2 text-[#171717] text-2xl font-semibold pl-3">Seaspeed</p>  
              <p className= "text-[#A5A5A5] pl-5">(02 vessel)</p>
              <p className="w-7 h-5 text-[#000000] pl-5">seaspeed@gmail.com</p>
        </div>
         </div>
       
      </div>

      </div>
      <div className="pl-5 pt-4 pb-4 box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl max-sm:p-[20px] flex flex-col justify-center items-start mt-4"> 
      <p className="text-lg ml-2">Company basic details</p>
      {/* <InputField className="m-1" fieldName="Name" type="text" label={"Name"} onChange={(e) => updateEvent({ name: e.target.value, isFormChanged: true })}/>  */}
      <AddCompany />
      </div>
      
     
      </div>
    }


export default CompanyProfile;