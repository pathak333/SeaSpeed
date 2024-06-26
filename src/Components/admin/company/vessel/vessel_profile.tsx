import { useEffect, useState } from "react";
import { ArrowLeft, Trash2 } from "react-feather";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UpdateVessel, assignNewCrewService, getAllContractByVesselIdService, getAllUnAssinedCrew, getUserContractByVessel, getVesselByIdService } from "../../../../services/admin.service";
import { addMonths, createOption } from "../../../../constants/values.constants";
import {  ArrowBack, Close, Edit, OpenInNewOutlined } from "@mui/icons-material";
import ModalBox from "../../../../uiComponents/custom_modal";
import { SearchSelect } from "../../../../uiComponents/inputField/searchSelectInputField.component";
import { Option } from "../../../../types/propes.types";
import Tooltip from "@mui/material/Tooltip";
import { useGlobalState } from "../../../../contexts/global.context";
import { LOADING, TEMP } from "../../../../constants/action.constant";
import FileUpload from "../../../../uiComponents/inputField/fileUpload.component";
import PdfViewer from "../../../../uiComponents/pdf_viewer";


import "./vesselprofile.css"
import CreateContract from "../../contract_pdf/create_new_contract";
import { displayDate } from "../../../../constants/commonFunction";





const VesselProfile = () => {
   const [globalState, dispatch] = useGlobalState();
   const [vesselData, setVesselData] = useState<any>({})
   const [crewData, setcrewData] = useState<any>([])
   //const [newCrew, setNewCrew] = useState<Option>({ label: "", value: "" })
   const [shipUserOption, setUserOption] = useState<Option[]>([])
   // change crew
   const [isModalOpen, setIsModalOpen] = useState({ state: false, id: "",oldlastData:{} });
   const [isManagerOpen, setIsManagerOpen] = useState(false);
   const [isCertificateOpen, setIsCertificateOpen] = useState(false);
   const [isCertificateSelected, setIsCertificateSelected] = useState(false);
   const [isLoading, setIsLoading] = useState(true)
   const [selectedCrew, setSelectedCrew] = useState<Option>({ label: "", value: "" })
   const [selectedPdf, updateSelectedPdf] = useState<any>()

   const navigate = useNavigate();
   const location = useLocation();
   const [fileData, updateFileData] = useState<any>()
   const [vesselDoc, updateVesselData] = useState<any>([])
   const [isContractboxOpen, updateisContractboxOpen] = useState<{isOpen:boolean,data:any}>({isOpen:false,data:null})
   const { id="" } = useParams();

   useEffect(() => {
      fetchData();
   }, [])


   const getDocId = async (docdata: any) => {
      updateFileData(docdata)
      const arrId = docdata.map((e: any) => e._id)
      updateVesselData([...vesselDoc, ...arrId])
      console.log(arrId);
      
      let { data } = await UpdateVessel(id, { certificate: arrId })
      setVesselData(data.data);
   }

   async function fetchData() {
      dispatch({ type: LOADING, payload: true });
      console.log(id)
      var data = await getVesselByIdService(id)
      // var cData = await getAllCrewByVesselIdService(id)
      var cData = await getAllContractByVesselIdService(id)
      console.log(data.data.data);
      console.log(cData.data.data);

      setVesselData(data.data.data);
      setcrewData(cData.data.data)
      dispatch({ type: LOADING, payload: false });
   }

   async function getUnassinedUser(rank: string) {
      let crew = await getAllUnAssinedCrew(rank);
      if (crew) {
         setIsLoading(false)
         let allData: Option[] = [];
         crew.data.data.map((e: any) => allData.push(createOption(`${e.firstname} ${e.lastname} (${e.rank.label})`, e._id)))
         setUserOption(allData)
      }

   }

   async function AssignNewUser(id: string, oldlastData: any) {
      
      console.log(selectedCrew);
      if (selectedCrew && selectedCrew.label !== "" && selectedCrew.value !== "") {
         const oldContractData = await getUserContractByVessel({ vesselid: vesselData._id, userId: id })
         console.log(oldContractData);
         await assignNewCrewService({ oldCrew: id, oldlastData: oldContractData.data.data[0].end_of_contract ?? new Date(), oldcontract:oldContractData.data.data[0]._id,rank:oldContractData.data.data[0].created_for.rank  , newCrew: selectedCrew, vessel: { label: vesselData.name, value: vesselData._id } })
         closeModal()
      }
   } 

   function openPdfViewerWindow(url: any) {
      updateSelectedPdf(url)
   }
   const remove = () => updateSelectedPdf("")


   const closeModal = () => {
      setSelectedCrew({ label: "", value: "" })
      setIsModalOpen({ state: false, id: "" ,oldlastData:{} });
   };





   function goBack() {
      navigate(-1)
   }

   const listofData = crewData.length > 0 ? crewData.map((item: any, index: any) => {
      //  console.log(item)
      return <>
      <Tooltip classes={{
         popper: `{
         backgroundColor: "black",
         color: 'white',
         fontSize: '15px'
      }`}} arrow title={`${item.context && item.context.hasOwnProperty('replacement') ? "New Crew: " + item.context.replacement.label : ""}`} placement="top">
         {/* <tr className={` bg-white border-b hover:bg-slate-100 cursor-pointer ${item.context && 'replacement' in item.context ? "bg-green-300" : ""}`}>
        
         <td onClick={() => {
            navigate("/adminDashboard/crewProfile", { state: { data: item, page: "allCrew" } });
         }} className="px-3  py-4 max-w-[110px] truncate">{item.firstname} {item.lastname}<br /> <span className="text-xs text-textGrey">{item.rank.label}</span></td>
         <td onClick={() => {
            navigate("/adminDashboard/crewProfile", { state: { data: item, page: "allCrew" } });
         }} className="px-3 py-4">{item.joiningDate}</td>
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
         </tr> */}
         <div
            className="flex p-4">
            <div
                  className="first w-full bg-red-200 p-3 rounded-s-lg" onClick={() => {
                  dispatch({ type: TEMP, payload: {...globalState.temp,data:item.created_for,page:"allCrew"} });
                     navigate(`/adminDashboard/crewProfile/${item.created_for._id}/allCrew`);
                     //, { state: { data: item.created_for, page: "allCrew" } }
               }}  >
               <div
                  className="flex justify-between">
                  <p
                     className="text-xl font-bold text-red-700 h-6 truncate">{item.created_for.firstname} {item.created_for.lastname}</p>
                  <div className="bg-red-600 rounded-2xl self-center p-2 "><p className="text-xs font-semibold text-red-200 tracking-widest ">{item.created_for.phone_no}</p></div>
                  </div>
                  <div
                  className="flex justify-between">
               <p
                        className="text-sm font-extrabold text-red-400">{item.rank?.label} </p>
                     <div className="bg-green-600 rounded-2xl self-center  px-2 mt-1"><p className="text-xs font-semibold text-green-200 tracking-widest ">{ item.status}</p></div>
               </div>
                  <div className="flex justify-between mt-2">
                  <div
                  className="flex flex-row text-red-700">
                  <p
                     className="">{displayDate(item.start_of_contract)}</p>
                  <p
                     className="mx-2">To</p>
                  <p>{displayDate(item.end_of_contract)}</p>
                     </div>
                     <button className="flex text-red-200  bg-gradient-to-br from-red-400 to-red-600 rounded-lg self-center p-2" onClick={(e) => {
                        e.stopPropagation()
                        updateisContractboxOpen({ isOpen: true, data: item });
                        
                     }} ><Edit /> Edit Contract</button>
                  </div>
            </div>
            <div
               className="infomain w-full transition duration-700 ease-in-out">
               {item.created_for.context && item.created_for.context.hasOwnProperty('replacement') && item.created_for.context.replacement.label ? <div className="submain container relative w-full h-full">
                  <div className="front absolute from-blue-200 to-blue-400 bg-gradient-to-br w-full h-full z-10  rounded-e-lg p-3"  >
                     <div
                        className="">
                        <p
                           className="text-xl font-bold text-blue-700 h-6">{item.created_for.context.replacement.label.split('(')[0]}</p>

                        <p
                           className="text-sm font-extrabold text-blue-500">{item.created_for.context.replacement.label.split('(')[1].replace(')', "")}</p>
                     </div>
                     {/* <div
                        className="flex flex-row text-blue-700">
                        <p
                           className="">Start
                           Date</p>
                        <p
                           className="mx-2">To</p>
                        <p>End
                           Date</p>
                     </div> */}
                  </div>
                  <div
                     className="back absolute  from-green-100 to-green-300 bg-gradient-to-br w-full h-full z-0  rounded-e-lg flex flex-col items-center place-content-center "
                  >
                     {/* <p onClick={() => {
                        getUnassinedUser(item.rank.label)
                        setIsModalOpen({ state: true, id: item._id });
                     }}>Remove Crew</p>
                     <p>Modify Contract</p> */}
                        <Close className=" absolute top-0 right-0" />
                     <p className="text-xl font-bold text-green-700 h-6 pb-2">{item.created_for.context.replacement.label.split('(')[0]}</p>
                     <div className="flex flex-row mt-3">
                        <button type="button" onClick={() => {
                           getUnassinedUser(item.created_for.rank.label)
                           setIsModalOpen({ state: true, id: item.created_for._id,oldlastData:item.end_of_contract ?? "" });
                        }} className="text-white tracking-widest  bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none   font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                           Change Crew
                        </button>
                        <button type="button" onClick={() => updateisContractboxOpen({isOpen:true,data:item})} className="text-white tracking-widest bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none   font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                           Modify Contract
                        </button>

                     </div>
                  </div>
               </div>
                  :
                  <div className="relative w-full h-full">
                     <div className="front absolute  from-blue-200 to-blue-400 bg-gradient-to-br w-full h-full z-10  rounded-e-lg p-3 flex items-center place-content-center"  >
                        <button type="button" onClick={() => {
                           getUnassinedUser(item.created_for.rank.label)
                           setIsModalOpen({ state: true, id: item.created_for._id,oldlastData: item.end_of_contract ?? "" });
                        }} className="text-white tracking-widest  bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none   font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                           Replace Crew
                        </button>
                     </div>
                  </div>
               }
            </div>
         </div>
      </Tooltip></>
   }) : [];



   return <>
   {isContractboxOpen.data && <CreateContract userData={isContractboxOpen.data.created_for} contractData={isContractboxOpen.data.created_for?.context?.replacement ?? isContractboxOpen.data} isOpen={isContractboxOpen.isOpen} onClose={() => updateisContractboxOpen({isOpen:false,data:null})} label={"Update Contract"} />}
   {/* {isContractboxOpen.data && <CreateContract userData={isContractboxOpen.data.created_for} contractData={isContractboxOpen.data.created_for.context?.replacement??} isOpen={isContractboxOpen.isOpen} onClose={() => updateisContractboxOpen({isOpen:false,data:null})} label={"Update Contract"} />} */}

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
                  onClick={() => { setIsCertificateOpen(true) }} >View Certificate</button>
               <button onClick={() => setIsManagerOpen(true)} type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
               >View all manager’s</button>
               {/* <button type="button"
                  className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
               >Upload Certificate</button> */}
               <FileUpload  folder={"vessel"} name="vessel_doc" from="admin" dataFun={getDocId} isMultiple={true} className="align-sub inline-flex" />
               <h1 className="ml-3 text-IbColor"> {fileData !== undefined ? <a href={fileData?.link}>You have uploaded one file {fileData?.name}</a> : ""}</h1>

            </div>

         </div>
         <div className="relative overflow-x-auto mb-3 p-3">
            {/* <table className="table-auto w-full text-sm text-left text-grey-500">
               <thead className="text-xs text-grey-700 uppercase ">
                  <tr>
                     <th scope="col" className="px-3 py-3 max-w-[50px] truncate">
                        Name
                     </th>
                     <th scope="col" className="px-3 py-3">
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
               <tbody></tbody>

            </table> */}
            {listofData}
         </div>

      </div>

      <ModalBox isOpen={isCertificateSelected} onClose={() => setIsCertificateSelected(false)} label="All Certificate" className="">
         <PdfViewer url={selectedPdf} close={() => {
            remove()
            setIsCertificateSelected(false)
         }} />
      </ModalBox>

      <ModalBox isOpen={isCertificateOpen} onClose={() => setIsCertificateOpen(false)} label="All Certificate" className="">
         <>
            <div className="flex flex-wrap ">
               <ArrowBack className="float-left mx-2" onClick={() => setIsCertificateOpen(false)} />
               <h2 className="text-lg font-semibold mb-4">All Certificate</h2>
            </div>
            {/* vesselData */}
            <table className="table-auto table-row w-full text-sm text-left text-grey-500">
               <thead className="text-xs text-grey-700 uppercase ">
                  <tr className="border-b-2">
                     <th scope="col" className="px-6 py-3">
                        Name
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Expire date
                     </th>
                     <th scope="col" className="px-6 py-3">
                        Action
                     </th>


                     <th scope="col" className="px-6 py-3">
                        Delete Manager
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {vesselData.certificate && vesselData.certificate.map((e: any) => <tr>
                     <td className="text-center">{e.name}</td>
                     <td className="text-center">{e.expire && e.expire.split('T')[0]}</td>
                     <td className="text-center" onClick={() => {
                        setIsCertificateOpen(false)
                        setIsCertificateSelected(true)
                        updateSelectedPdf(e.link)
                     }}><OpenInNewOutlined /> </td>
                     <td className="text-center webkit-center"><Trash2 /> </td>
                  </tr>)}
               </tbody>
            </table>
         </>
      </ModalBox>

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
               {vesselData?.crewManagerId && 'value' in vesselData?.crewManagerId && vesselData.crewManagerId.value !== "" && <tr className="border-b-2 hover:bg-slate-100 cursor-pointer">
                  <td className="px-6 py-3">{vesselData.crewManagerId.label}</td>
                  <td className="px-6 py-3">{vesselData.crewManagerId.value.phone}</td>
                  <td className="px-6 py-3">{vesselData.crewManagerId.value.email}</td>
                  <td className="px-6 py-3">{vesselData.crewManagerId.value.type}</td>
                  <td className="px-6 py-3">
                     <button type="button" className="text-xs text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     >Delete Manager</button>
                  </td>
               </tr>}
               {vesselData?.shipManagerId && 'value' in vesselData?.shipManagerId && vesselData.shipManagerId.value !== "" && <tr className="border-b-2 hover:bg-slate-100 cursor-pointer">
                  <td className="px-6 py-3">{vesselData.shipManagerId.label}</td>
                  <td className="px-6 py-3">{vesselData.shipManagerId.value.phone}</td>
                  <td className="px-6 py-3">{vesselData.shipManagerId.value.email}</td>
                  <td className="px-6 py-3">{vesselData.shipManagerId.value.type}</td>
                  <td className="px-6 py-3">
                     <button type="button" className="text-xs text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     >Delete Manager</button>
                  </td>
               </tr>}
               {vesselData?.crewAgencyManagerId && 'value' in vesselData?.crewAgencyManagerId && vesselData.crewAgencyManagerId.value !== "" && <tr className="hover:bg-slate-100 cursor-pointer">
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
               setIsModalOpen({ state: false, id: "",oldlastData:{} })
            }} />
            <h2 className="text-lg font-semibold mb-4">Select Crew</h2>


         </div>
         <SearchSelect
            className="m-4"
            autoFocus={true}
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
            onClick={() => AssignNewUser(isModalOpen.id,isModalOpen.oldlastData )}
            disabled={selectedCrew && selectedCrew.value === ""}
            type="button"
            className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-500 disabled:focus:bg-slate-400 disabled:hover:bg-slate-400"
         >Assign New Crew</button>

      </ModalBox>
   </>
}

export default VesselProfile;