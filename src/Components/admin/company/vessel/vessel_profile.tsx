import { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { assignNewCrewService, getAllCrewByVesselIdService, getAllUnAssinedCrew, getVesselByIdService } from "../../../../services/admin.service";
import { addMonths, createOption } from "../../../../constants/values.constants";
import { ChangeCircleRounded, ArrowBack } from "@mui/icons-material";
import ModalBox from "../../../../uiComponents/custom_modal";
import { SearchSelect } from "../../../../uiComponents/inputField/searchSelectInputField.component";
import { Option } from "../../../../types/propes.types";
import Tooltip from "@mui/material/Tooltip";







const VesselProfile = () => {

  
   const [vesselData, setVesselData] = useState<any>({})
   const [crewData, setcrewData] = useState<any>([])
   //const [newCrew, setNewCrew] = useState<Option>({ label: "", value: "" })
   const [shipUserOption, setUserOption] = useState<Option[]>([])
   // change crew
   const [isModalOpen, setIsModalOpen] = useState({state:false,id:""});
   const [isManagerOpen, setIsManagerOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(true)
   const [selectedCrew,setSelectedCrew] = useState<Option>({ label: "", value: "" })

   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      fetchData();
   }, [])

  


   async function fetchData() {
      console.log(location.state.id)
      var data = await getVesselByIdService(location.state.id)
      var cData = await getAllCrewByVesselIdService(location.state.id)
      console.log(data.data.data);
      console.log(cData.data.data);

      setVesselData(data.data.data);
      setcrewData(cData.data.data)
   }

   async function getUnassinedUser(rank:string) {
      let crew = await getAllUnAssinedCrew(rank);
      if (crew) {
         setIsLoading(false)
         let allData: Option[] = [];
         crew.data.data.map((e: any) => allData.push(createOption(`${e.firstname} ${e.lastname} (${e.rank.label})`, e._id)))
         setUserOption(allData)
      }

   }

   async function AssignNewUser(id: string) {
      console.log(selectedCrew);
      if (selectedCrew.label !== "" && selectedCrew.value !== "") {
         await assignNewCrewService({ oldCrew: id, newCrew: selectedCrew })  
         closeModal()
      }
   }



   const closeModal = () => {
      setSelectedCrew({ label: "", value: "" })
      setIsModalOpen({state:false,id:""});
   };





   function goBack() {
      navigate(-1)
   }

   const listofData = crewData.length > 0 ? crewData.map((item: any, index: any) => {
      //  console.log(item)
      return <Tooltip classes={{popper:`{
         backgroundColor: "black",
         color: 'white',
         fontSize: '15px'
      }`}}  arrow title={`${'replacement' in item.context ? "New Crew: "+item.context.replacement.label :""}`} placement="top"><tr key={index} className={` bg-white border-b hover:bg-slate-100 cursor-pointer ${'replacement' in item.context ? "bg-green-300" : ""}`}>
        
         <td onClick={() => {
            navigate("/adminDashboard/crewProfile", { state: { data: item, page: "allCrew" } });
         }} className="px-6 py-4">{item.firstname} {item.lastname}<br /> <span className="text-xs text-textGrey">{item.rank.label}</span></td>
         <td onClick={() => {
            navigate("/adminDashboard/crewProfile", { state: { data: item, page: "allCrew" } });
         }} className="px-6 py-4">{item.joiningDate}</td>
         <td onClick={() => {
            navigate("/adminDashboard/crewProfile", { state: { data: item, page: "allCrew" } });
         }} className="px-6 py-4">{(addMonths(item.joiningDate, item.rank.value.period).toString())}</td>
         <td onClick={() => {
            navigate("/adminDashboard/crewProfile", { state: { data: item, page: "allCrew" } });
         }} className="px-6 py-4">{item.phone_no}</td>

         <td className="px-6 py-4 " onClick={() => {
             getUnassinedUser(item.rank.label)
             setIsModalOpen({state:true,id:item._id});
         }}>

            <ChangeCircleRounded

            />
         </td>
      </tr></Tooltip>
   }) : [];



   return <>
      <div id="companyProfile" className="main  w-full">

         <div className="pl-8 box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px] flex flex-col justify-center items-start ">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-start justify-start">
               <span className="mr-2">
                  <ArrowLeft onClick={() => { goBack() }} />
               </span>
               {vesselData.name} Profile
            </p>
            <p className="pl-8 text-[#A5A5A5] pb-3">
               Vessel Type is {vesselData.type}
            </p>

            <div className="pl-10 flex flex-row items-center justify-center content-center">
               <div id="pic" className="w-20 h-20 bg-slate-300 rounded-full  self-baseline"></div>
               <div className="h-auto ">
                  <p className="mx-2 text-[#171717] text-2xl font-semibold pl-3">{vesselData.name}</p>
                  <p className="text-[#A5A5A5] pl-5">Type:- {vesselData.type} <span className="text-black">|</span> Flag:- {vesselData.flag} <span className="text-black">|</span> Imo Number:- {vesselData.imoNumber}</p>
                  {/* <hr className="ml-5 my-2 bg-black" /> */}



               </div>
            </div>
            <div className="pt-5">
               <button type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
               >View Certificate</button>
               <button onClick={() => setIsManagerOpen(true)} type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
               >View all manager’s</button>
               <button type="button"
                  className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
               >Upload Certificate</button>
            </div>

         </div>
         <div className="relative overflow-x-auto mb-3">
            <table className="table-auto w-full text-sm text-left text-grey-500">
               <thead className="text-xs text-grey-700 uppercase ">
                  <tr>
                     <th scope="col" className="px-6 py-3">
                        Name
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Sign in Date
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Sign off Date
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Phone
                     </th>

                     <th scope="col" className="px-6 py-3">
                        Replace crew
                     </th>
                  </tr>
               </thead>
               <tbody>{listofData}</tbody>

            </table>

         </div>

      </div>

      <ModalBox isOpen={isManagerOpen} onClose={() => setIsManagerOpen(false)} label="All Manager’s" className="">
         <div className="flex flex-wrap ">
            <ArrowBack className="float-left mx-2" onClick={() => setIsManagerOpen(false)} />
            <h2 className="text-lg font-semibold mb-4">All Manager’s</h2>
            <button className=" ml-auto text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add new manager</button>

         </div>
         <table className="table-auto table-row w-full text-sm text-left text-grey-500">
            <thead className="text-xs text-grey-700 uppercase ">
               <tr className="border-b-2">
                  <th scope="col" className="px-6 py-3">
                     Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Type
                  </th>

                  <th scope="col" className="px-6 py-3">
                     Delete Manager
                  </th>
               </tr>
            </thead>
            {vesselData._id && <tbody>
              {'value' in vesselData.crewManagerId && vesselData.crewManagerId.value !== "" && <tr className="border-b-2 hover:bg-slate-100 cursor-pointer">
                  <td className="px-6 py-3">{vesselData.crewManagerId.label}</td>
                  <td className="px-6 py-3">{vesselData.crewManagerId.value.phone}</td>
                  <td className="px-6 py-3">{vesselData.crewManagerId.value.email}</td>
                  <td className="px-6 py-3">{vesselData.crewManagerId.value.type}</td>
                  <td className="px-6 py-3">
                     <button type="button" className="text-xs text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     >Delete Manager</button>
                  </td>
               </tr>}
              {'value' in vesselData.shipManagerId && vesselData.shipManagerId.value !== "" && <tr className="border-b-2 hover:bg-slate-100 cursor-pointer">
                  <td className="px-6 py-3">{vesselData.shipManagerId.label}</td>
                  <td className="px-6 py-3">{vesselData.shipManagerId.value.phone}</td>
                  <td className="px-6 py-3">{vesselData.shipManagerId.value.email}</td>
                  <td className="px-6 py-3">{vesselData.shipManagerId.value.type}</td>
                  <td className="px-6 py-3">
                     <button type="button" className="text-xs text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     >Delete Manager</button>
                  </td>
               </tr>}
               {'value' in vesselData.crewAgencyManagerId && vesselData.crewAgencyManagerId.value !== "" && <tr className="hover:bg-slate-100 cursor-pointer">
                  <td className="px-6 py-3">{vesselData.crewAgencyManagerId.label}</td>
                  <td className="px-6 py-3">{vesselData.crewAgencyManagerId.value.phone}</td>
                  <td className="px-6 py-3">{vesselData.crewAgencyManagerId.value.email}</td>
                  <td className="px-6 py-3">{vesselData.crewAgencyManagerId.value.type}</td>
                  <td className="px-6 py-3">
                     <button type="button" className="text-xs text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     >Delete Manager</button>
                  </td>
               </tr>}
            </tbody>}
         </table>


      </ModalBox>
      <ModalBox isOpen={isModalOpen.state} onClose={closeModal} label="Change Crew Member" className="">
         <div className="flex flex-wrap ">
            <ArrowBack className="float-left mx-2" onClick={() => {
               setSelectedCrew({ label: "", value: "" })
               setIsModalOpen({ state: false, id: "" })
            }} />
            <h2 className="text-lg font-semibold mb-4">Select Crew</h2>
           

         </div>
         <SearchSelect
               className="m-4"

               label={"Select Crew"}
               //type={""}
               onChange={(e) => setSelectedCrew(e)}
               //onInputChange={(e: any) => updateEvent({ currentDialog: "ship" })}
               value={selectedCrew}
               //error={errorReturn("Oil_tanker_DCE")}
               options={shipUserOption}
               // onCreateOption={onCreate}
               isDisabled={false}
            isLoading={isLoading} />
         <button
            onClick={() => AssignNewUser(isModalOpen.id)}
            disabled={selectedCrew.value === ""}
            type="button" 
                  className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-500 disabled:focus:bg-slate-400 disabled:hover:bg-slate-400"
               >Assign New Crew</button>
       
      </ModalBox>
   </>
}

export default VesselProfile;