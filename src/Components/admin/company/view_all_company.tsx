import { useEffect, useState } from "react";
import { getAllCompanyService } from "../../../services/admin.service";
import { Trash2 } from "react-feather";
import CommonLayout from "../../../views/AdminViews/commonLayout";
import { useNavigate } from "react-router-dom";


const ViewAllCompany = () => {

    const [companyList, updateCompanyList] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        const { data } = await getAllCompanyService();
        console.log(data);
        updateCompanyList(data.data)

    }

    const listofData = companyList.map((item: any, index: any) => (
        <tr key={index} className="bg-gray-200 border-b-2 border-b-gray-50 hover:bg-slate-100 cursor-pointer" onClick={(e:any)=>{
          console.log("click on vessel")
          navigate("/adminDashboard/companyProfile",{state:{company:item}})}}>
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.email}</td>
          <td className="px-6 py-4">{item.phone}</td>
          <td className="px-6 py-4">{item.address}</td>
          <td className="px-6 py-4">file</td>
          <td className="px-6 py-4">
            <Trash2
              onClick={() => {
               
              }}
            />
          </td>
        </tr>
      ));


return <CommonLayout heading={"View All Company"} subHeading={"Company and their details"} lastHeading={""}>
<div className="relative overflow-x-auto mb-3 rounded-lg  ">
<table className="table-auto w-full text-sm text-left text-grey-500   ">
 <thead className="text-xs text-grey-700  bg-gray-400 uppercase ">
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
       Address
     </th>
    
     <th scope="col" className="px-6 py-3">
       File
     </th>
     <th scope="col" className="px-6 py-3">
       Action
     </th>
   </tr>
 </thead>
 {companyList.length > 0 ? (<tbody >{listofData}</tbody>) : (<tbody ><tr className="text-center"><td colSpan={7} className="text-lg">You have no vessel assigned yet</td></tr></tbody>)}

</table>
</div>
</CommonLayout>
}

export default ViewAllCompany;