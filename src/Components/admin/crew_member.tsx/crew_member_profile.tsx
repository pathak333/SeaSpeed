import { ArrowLeft } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { AirplaneTicket, Description } from "@mui/icons-material";
import DasboardCardLayout from "../../dashboard/dashboard_card_layout";
import AssignVessel from "./assign_vessel_to_crew";
import { isObjectEmpty } from "../../../constants/commonFunction";
import { useGlobalState } from "../../../contexts/global.context";
import DialogBox from "../../../uiComponents/dialogBox";
import { useState } from "react";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { sendInstruction, sendMessageToWhatsapp } from "../../../services/admin.service";
import { toast } from "react-toastify";



const CrewProfile = () => {
   const [globalState, dispatch] = useGlobalState();

   // console.log("crew profile time")
   const location = useLocation();
   const { data, page } = location.state;
   // console.log(data, "user data");
   // console.log(globalState.data.data, "globalState data");

   const navigate = useNavigate();
   const [isInstrucOpen,updateInstrucOpen] = useState(false)
   const [InstrucText,updateInstrucText] = useState("")
   function goBack() {
      navigate(-1)
   }

   const handleSaveButton = async () => {
      const payload = {
         message: InstrucText,
         sendTo: data._id
      }
      try {
         const sendData = await sendInstruction(payload);
         if (sendData) {
            updateInstrucOpen(false)
             sendMessageToWhatsapp(data.phone_no,InstrucText)
             toast.success("Instruction Send Successfully")
            
         }
      } catch (error:any) {
         toast.error(error.message)
      }
      

   }

   return <div className="">
      <div id="crewProfile" className="main  w-full">
         <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px] flex flex-col justify-center items-start ">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-start justify-start">
               <span className="mr-2">
                  <ArrowLeft onClick={() => { goBack() }} />
               </span>{" "}
               {data.firstname} {data.lastname} Profile
            </p>
            <p className="pl-8 text-[#A5A5A5]">
               {data.rank.label}
            </p>

            <div className="flex flex-row items-center justify-center content-center">
               <div id="pic" className="w-20 h-20 bg-slate-300 rounded-full overflow-hidden">
               <img src={data.avatar ? data.avatar : "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="seaSpeed Profile " className="overflow-hidden rounded-full" />
               </div>
               <div className="h-10">
                  <button className="border border-[#0075FF] text-IbColor rounded-lg text-xl p-2 mx-2" onClick={()=>updateInstrucOpen(true)}>Send instructions</button>
                  <button className="bg-[#0075FF] mx-2 text-white text-xl p-2 rounded-lg"><Description /> Send contract</button>
                  <button className="border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2"><AirplaneTicket /> Send tickets & visa</button>
                {globalState.data.data && (globalState.data.data.role === 'superadmin' || globalState.data.data.permission.includes("application")) &&  <AssignVessel userId={data._id} isVesselAvailable={!isObjectEmpty(data.vessel)} />}
               </div>
            </div>
         </div>

      </div>
      <DasboardCardLayout id={data._id} data={data} comeFrom="admin" page={page} className="" />
      <DialogBox label="Send instruction to user" isOpen={isInstrucOpen} onClose={() => { updateInstrucOpen(false) }} component={
         <>
           
            {/* <InputField
            type='text'
            fieldName='Instruction'
            label=' Instruction'
            className='mb-4'
            // error={errorReturn(' fieldName')}
            // icon={<AccountCircle className='text-gray-300' />}
            onChange={(e) => updateInstrucText( e.target.value )}
            /> */}
        <textarea  onChange={(e:any) => updateInstrucText(e.target.value)} className=" border-2 rounded-lg  p-2 w-full" name="Instruction" id="rejectbox" cols={30} rows={10} placeholder="Enter Your Instruction Message here..."  /> 
        <button type="button" disabled={InstrucText.length < 5} className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold py-2 px-4 rounded" onClick={handleSaveButton}>Send</button>
            
         </>

      } />
   </div>
}


export default CrewProfile;


