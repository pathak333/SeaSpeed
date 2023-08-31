import { ArrowLeft, Trash2 } from "react-feather";


import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useReducer, useState } from "react";
// import AddCompany from "./add_company";
import { getAllVesselByCompanyIdService } from "../../../services/admin.service";




   const CompanyProfile = () => {

      const [vessel,setVessel] = useState([])
      const location = useLocation();

      const fetchData = async () => {
         let data = await getAllVesselByCompanyIdService(location.state.company._id)
         setVessel(data.data.data)
         console.log(data.data.data);
         
      }


      useEffect(() => {
         fetchData();
      }, [])


      const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
         const newEvent = { ...prev, ...next };
         return newEvent;
      },
         console.log("crew profile time"))

      const navigate = useNavigate();
      function goBack() {
         navigate(-1)
      }
      // const addMoreManager = (data: any) => {
      //    formEvent.manager.push(data);
      //    updateEvent({ manager: formEvent.manager })

      // }


      
    const listofData = vessel.map((item: any, index: any) => (
      <tr key={index} className="bg-slate-100 border-b" onClick={(e:any)=>{
        console.log("click on vessel")
        navigate("/adminDashboard/vesselProfile",{state:{id:item._id}})}}>
        <td className="px-6 py-4 text-lg font-semibold leading-none">{item.name}<br/><span className="font-normal text-sm text-textGrey text-">{item.imoNumber}</span></td>
        <td className="px-6 py-4">{item.type}</td>
        <td className="px-6 py-4">{item.flag}</td>
        <td className="px-6 py-4">{item.crewManagerId.label}</td>
          <td className="px-6 py-4">{ item.shipManagerId.label}</td>
        <td className="px-6 py-4">file</td>
        <td className="px-6 py-4">
          <Trash2
            onClick={() => {
             console.log("delete vessel ")
            }}
          />
        </td>
      </tr>
    ));


     return <div className="">
        
         <div id="companyProfile" className="main  w-full">

            <div className="pl-8 box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px] flex flex-col justify-center items-start ">
               {/* <p className="font-medium text-[22px] leading-none flex flex-row  items-start justify-start">
                  <span className="mr-2">
                     <ArrowLeft onClick={() => { goBack() }} />
                  </span>
                  {location.state.company.name}
               </p>
               <p className="pl-8 text-[#A5A5A5] pb-3">
                  Number of vessels will be Displayed Here
               </p> */}

               <div className="pl-10 flex flex-row items-center justify-center content-center">
               <span className="mr-2">
                     <ArrowLeft onClick={() => { goBack() }} />
                  </span>
                  <div id="pic" className="w-20 h-20 bg-slate-300 rounded-full"></div>
                  <div className="h-10 pb-20">
                     <p className="mx-2 text-[#171717] text-2xl font-semibold pl-3">{location.state.company.name}</p>
                     <p className="text-[#A5A5A5] pl-5">({ vessel.length} vessel)</p>
                     <p className=" h-5 flex flex-row text-[#000000] pl-5">{location.state.company.email} | {location.state.company.phone}</p>
                  </div>
               </div>

            </div>

         </div>
         <div className="px-5 pt-4 pb-4 box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl max-sm:p-[20px] flex flex-col justify-center items-start mt-4">
            <p className="text-lg ml-2">Company Vessel List</p>
            {/* <InputField className="m-1" fieldName="Name" type="text" label={"Name"} onChange={(e) => updateEvent({ name: e.target.value, isFormChanged: true })}/>  */}
            {/* <AddCompany /> */}
            <table className="table-auto w-full text-sm text-left text-grey-500">
          <thead className="text-xs text-grey-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Flag
              </th>
              <th scope="col" className="px-6 py-3">
                Crew Manager
              </th>
              <th scope="col" className="px-6 py-3">
                Vessel Manager
              </th>
              <th scope="col" className="px-6 py-3">
                File
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {vessel.length > 0 ? (<tbody>{listofData}</tbody>) : (<tbody><tr className="text-center"><td colSpan={7} className="text-lg">You have no vessel assigned yet</td></tr></tbody>)}
         
        </table>
        </div>

      </div>
   }


export default CompanyProfile;