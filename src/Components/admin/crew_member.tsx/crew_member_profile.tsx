import { ArrowLeft, Edit } from "react-feather";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AirplaneTicket, Description } from "@mui/icons-material";
import DasboardCardLayout from "../../dashboard/dashboard_card_layout";
import AssignVessel from "./assign_vessel_to_crew";
import { isObjectEmpty } from "../../../constants/commonFunction";
import { useGlobalState } from "../../../contexts/global.context";
import DialogBox from "../../../uiComponents/dialogBox";
import { useEffect, useState } from "react";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { getAllFileCrew, getCrewData, getUserContract, sendInstruction, sendMessageToWhatsapp } from "../../../services/admin.service";
import { toast } from "react-toastify";
import { LOADING, TEMP } from "../../../constants/action.constant";
import CreateContract from "../contract_pdf/create_new_contract";



const CrewProfile = () => {
   const [globalState, dispatch] = useGlobalState();

   
   // const location = useLocation();
   console.log(globalState)
   // const { data, page } = globalState.temp;
   const { id="",page="" } = useParams();
   // const { data, page } = location.state;


   const navigate = useNavigate();
   const [isInstrucOpen, updateInstrucOpen] = useState(false)
   const [isContractboxOpen,updateContractboxOpen] = useState(false)
   const [InstrucText, updateInstrucText] = useState("")
   const [contract, updatecontract] = useState("")
   const [data, updateCrewData] = useState<any>()
   const [allFile, updateAllFile] = useState([])


   function goBack() {
      navigate(-1)
   }


   const fetchCrewData = async () => {
      dispatch({ type: LOADING, payload: true });
      const { data } = await getCrewData(id)
      if (data) {
         console.log(data);
         updateCrewData(data.data)
         fetchData(id)
         fetchAllDoc(id)
     }
     dispatch({ type: LOADING, payload: false });
   }



   const fetchData = async (id:string) => {
      dispatch({ type: LOADING, payload: true });
      const { data } = await getUserContract(id)
      if (data) {
          if (data.data.length > 0) {
            updatecontract({ ...data.data })
          }
      }
      dispatch({ type: LOADING, payload: false });

   }

   async function fetchAllDoc(userid:any) {
      const { data } = await getAllFileCrew(userid);
      console.log(data)
      updateAllFile(data.data)
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

   function navigateApp() {
      navigate("/adminDashboard/applicationPdf", { state: { id: data._id } })
  }


   useEffect(() => {
      fetchCrewData()
      // dispatch({ type: TEMP, payload: data._id })
      
   },[])


   const closeContractbox = () => {
      updateContractboxOpen(false)
}

   
   return <div>
      {data && <div className="">
      <div id="crewProfile" className="main  w-full">
         <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[40px] max-sm:p-[20px] flex flex-col justify-center items-start ">
            <div className="flex w-full justify-between">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-start justify-start">
               <span className="mr-2">
                  <ArrowLeft onClick={() => { goBack() }} />
                  </span>{" "}
                  {console.log(data)}
               {data.firstname} {data.lastname} Profile
               </p>
               <p className=" text-[32px] font-bold text-gray-200 leading-none items-start justify-start">Crew Profile</p>
           </div>
            <p className="p-2 mb-2 rounded-full text-[#A5A5A5] text-sm bg-green-100 ">
               {data.rank.label}  {data.vessel && data.vessel.label ?  <span>At <span className="font-bold text-green-400 tracking-wider">{data.vessel.label}</span></span> :""}
            </p>
            <div className="flex  items-center w-full ">
                  
            <div className="flex flex-1 flex-row items-center justify-start content-center">
               <div id="pic" className="w-20 h-20 bg-slate-300 rounded-full overflow-hidden">
               <img src={data.avatar ? data.avatar : "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt="seaSpeed Profile " className="overflow-hidden rounded-full" />
               </div>
               <div className="h-10">
                  <button className="border border-[#0075FF] text-IbColor rounded-lg text-xl p-2 mx-2" onClick={()=>updateInstrucOpen(true)}>Send instructions</button>
                  <button onClick={() => updateContractboxOpen(true)} className="bg-[#0075FF] mx-2 text-white text-xl p-2 rounded-lg  "><Description /> Create contract</button>
                  <button onClick={() => {navigate('/adminDashboard/AllContract', { state: { userdata: data, contractData: contract} })}} className="bg-[#0075FF] mx-2 text-white text-xl p-2 rounded-lg  " ><Description />All contract</button>
                  <CreateContract userData={data ?? null} isOpen={isContractboxOpen} onClose={closeContractbox} label={"Create Contract"} />
                  
                {globalState.data.data && (globalState.data.data.role === 'superadmin' || globalState.data.data.permission.includes("application")) &&  <AssignVessel userId={data._id} isVesselAvailable={!isObjectEmpty(data.vessel)} replacement={!isObjectEmpty(data.replacement) ? data.replacement : null } />}
               </div>
               </div>
               
                  <Edit className="" onClick={()=>{navigate(`/adminDashboard/createCrew/?id=${data._id}`)}} />
               
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
      </div>}
      <div id="agrement" className="mb-5 mt-2 mr-4 flex flex-col px-3 pt-3 ml-2 rounded-lg bg-white  h-80 overflow-auto max-sm:w-full items-center shadow">
          <h1>All Documents</h1>
          <table className="table-auto w-full text-sm text-left text-grey-500">
            <thead className="text-xs text-grey-700 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Expire
                </th>
              </tr>
            </thead>
            <tbody>
              {allFile.map((item: any, index: any) => (

                <tr key={index} className="bg-[#E4F0FF] border-b-8 border-white text-IbColor" onClick={() => window.open(item.link, '_blank')}>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.expire && item.expire.split('T')[0]}</td></tr>

              ))}</tbody>
          </table>
        </div>
   </div>
}


export default CrewProfile;


