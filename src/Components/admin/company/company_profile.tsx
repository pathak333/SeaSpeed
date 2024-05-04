import { ArrowLeft, Edit, Trash2 } from "react-feather";


import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
// import AddCompany from "./add_company";
import { getAllManagerByCompanyId, getAllVesselByCompanyIdService } from "../../../services/admin.service";
import PdfViewer from "../../../uiComponents/pdf_viewer";





const CompanyProfile = () => {

  const [vessel, setVessel] = useState([])
  const [manager, setManager] = useState([])
  const [currentList, setCurrentList] = useState("vessel")
  const [selectedPdf, updateSelectedPdf] = useState<any>()
  const location = useLocation();
  const company = location.state.company;

  const fetchData = async () => {
    let data = await getAllVesselByCompanyIdService(company._id)
    setVessel(data.data.data)
    console.log(data.data.data);

  }

  const fetchManager = async () => {
    const { data } = await getAllManagerByCompanyId(company._id);
    if (data) {
      setManager(data.data)
    }
  }


  useEffect(() => {
    fetchData();
    fetchManager();
  }, [])


  // const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
  //   const newEvent = { ...prev, ...next };
  //   return newEvent;
  // },
  //   console.log("crew profile time"))

  const navigate = useNavigate();
  function goBack() {
    navigate(-1)
  }
  // const addMoreManager = (data: any) => {
  //    formEvent.manager.push(data);
  //    updateEvent({ manager: formEvent.manager })

  // }


  function openPdfViewerWindow(url: any) {
    console.log(url);
    
    updateSelectedPdf(url)
  }
  const remove = () => updateSelectedPdf("")

  const listofData = vessel.map((item: any, index: any) => (
    <tr key={index} className="bg-slate-100 border-b hover:bg-slate-100 cursor-pointer" onClick={(e: any) => {
      console.log("click on vessel")
      navigate(`/adminDashboard/vesselProfile/${item._id}`)
    }}>
      <td className="px-6 py-4 text-lg font-semibold leading-none">{item.name}<br /><span className="font-normal text-sm text-textGrey text-">{item.imoNumber}</span></td>
      <td className="px-6 py-4">{item.type}</td>
      <td className="px-6 py-4">{item.flag}</td>
      <td className="px-6 py-4">{item.crewManagerId.label}</td>
      <td className="px-6 py-4">{item.shipManagerId.label}</td>
    
      <td className="px-6 py-4">
        <Trash2
          onClick={() => {
            console.log("delete vessel ")
          }}
        />
      </td>
    </tr>
  ));


  const listofManagerData = manager.map((item: any, index: any) => (
    <tr key={index} className="bg-slate-100 border-b hover:bg-slate-100 cursor-pointer" onClick={(e: any) => {
      console.log("click on vessel")
  
    }}>
      <td className="px-6 py-4 text-lg font-semibold leading-none">{item.name}<br /><span className="font-normal text-sm text-textGrey text-">{item.imoNumber}</span></td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.phone}</td>
      <td className="px-6 py-4">{item.type}</td>
      <td className="px-6 py-4">{item.address}</td>
      {/* <td className="px-6 py-4">file</td> */}
      <td className="px-6 py-4">
        <Trash2
          onClick={() => {
            console.log("delete vessel ")
          }}
        />
      </td>
    </tr>
  ));


  const listofDocData = company.documentId.map((item: any, index: any) => (
    <tr key={index} className="bg-slate-100 border-b hover:bg-slate-100 cursor-pointer" onClick={(e: any) => {
    
    }}>
      <td className="px-6 py-4 text-lg font-semibold leading-none">{item.name}</td>
      <td className="px-6 py-4">{item.expire && item.expire.split("T")[0]}</td>
      <td className="px-6 py-4 text-blue-800 font-semibold cursor-pointer" onClick={() => openPdfViewerWindow(item.link)}  >Open</td>


      {/* <td className="px-6 py-4">file</td> */}
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

      <div className="pl-8 box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px] flex flex-row justify-between items-center  ">
        {/* <p className="font-medium text-[22px] leading-none flex flex-row  items-start justify-start">
                  <span className="mr-2">
                     <ArrowLeft onClick={() => { goBack() }} />
                  </span>
                  { company.name}
               </p>
               <p className="pl-8 text-[#A5A5A5] pb-3">
                  Number of vessels will be Displayed Here
               </p> */}

        <div className="pl-10 flex flex-row items-center justify-around content-center ">
          <span className="mr-2">
            <ArrowLeft onClick={() => { goBack() }} />
          </span>
          <div id="pic" className="w-20 h-20 bg-slate-300 rounded-full"></div>
          <div className="h-10 pb-20">
            <p className="mx-2 text-[#171717] text-2xl font-semibold pl-3">{company.name}</p>
            <p className="text-[#A5A5A5] pl-5">({vessel.length} vessel)</p>
            <p className=" h-5 flex flex-row text-[#000000] pl-5">{company.email} | {company.phone}</p>
          </div>
        </div>
        <Edit onClick={() => {
          navigate("/adminDashboard/addCompany", { state: { company: company } })
        }} />
        {/* () => setIsManagerOpen(true) */}
        {/* <button onClick={() => { }} type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >View all manager’s</button> */}
      </div>

    </div>
    <div className="px-5 pt-4 pb-4 box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl max-sm:p-[20px] flex flex-col justify-center items-start mt-4">
      <div className="w-full mb-4 flex flex-row justify-between items-center">
        <p className={`text-lg ml-2 cursor-pointer ${currentList === "vessel" ? "border-b-4 border-blue-400" : "text-gray-500"}`} onClick={() => setCurrentList("vessel")}>Show Vessel List</p>
        <p className={`text-lg ml-2 cursor-pointer ${currentList === "manager" ? "border-b-4 border-blue-400" : " text-gray-500"}`} onClick={() => setCurrentList("manager")}>Show Manager List</p>
        <p className={`text-lg ml-2 cursor-pointer ${currentList === "doc" ? "border-b-4 border-blue-400" : " text-gray-500"}`} onClick={() => setCurrentList("doc")}>Show Document List</p>
      </div>
      {/* <InputField className="m-1" fieldName="Name" type="text" label={"Name"} onChange={(e) => updateEvent({ name: e.target.value, isFormChanged: true })}/>  */}
      {/* <AddCompany /> */}
      {currentList === "vessel" && <table className="table-auto w-full text-sm text-left text-grey-500">
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
              Action
            </th>
          </tr>
        </thead>
        {vessel.length > 0 ? (<tbody>{listofData}</tbody>) : (<tbody><tr className="text-center"><td colSpan={7} className="text-lg">You have no vessel assigned yet</td></tr></tbody>)}

      </table>}
      {currentList === "manager" && <table className="table-auto w-full text-sm text-left text-grey-500">
        <thead className="text-xs text-grey-700 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {manager.length > 0 ? (<tbody>{listofManagerData}</tbody>) : (<tbody><tr className="text-center"><td colSpan={7} className="text-lg">You have no vessel assigned yet</td></tr></tbody>)}

      </table>}
      {currentList === "doc" && <table className="table-auto w-full text-sm text-left text-grey-500">
        <thead className="text-xs text-grey-700 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Expire
            </th>


            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {company.documentId.length > 0 ? (<tbody>{listofDocData}</tbody>) : (<tbody><tr className="text-center"><td colSpan={7} className="text-lg">You have no vessel assigned yet</td></tr></tbody>)}

      </table>}
      {selectedPdf && <PdfViewer url={selectedPdf} close={remove} />}

    </div>

  </div>
}


export default CompanyProfile;