import { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCrewByVesselIdService, getVesselByIdService } from "../../../../services/admin.service";



const VesselProfile = () => {

   const [vesselData, setVesselData] = useState<any>({})
   const [crewData, setcrewData] = useState<any>([])

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

   function goBack() {
      navigate(-1)
   }

   const listofData = crewData.length >0 ? crewData.map((item: any, index: any) => {
      console.log(item)
    return  <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer" onClick={() => {
      navigate("/adminDashboard/crewProfile",{state:{data:item,page:"allCrew"}});
     }}>
        <td className="px-6 py-4">{item.firstname} {item.lastname}<br /> <span className="text-xs text-textGrey">{ item.rank.label}</span></td>
            <td className="px-6 py-4">{item.vessel.label}</td>
            <td className="px-6 py-4">{item.email}</td> 
         <td className="px-6 py-4">{item.phone_no}</td>
          
      <td className="px-6 py-4 ">
       
          <Trash2
            onClick={() => {
                 
            }}
          />
        </td>
      </tr>
    }) :[];
  


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
                  <button type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >View Certificate</button>
                  <button type="button"
                     className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                     >View Certificate</button>
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
                 Vessel assigned
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
             
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{listofData}</tbody>
         
        </table>
      </div>
      </div>
   </>
}

export default VesselProfile;