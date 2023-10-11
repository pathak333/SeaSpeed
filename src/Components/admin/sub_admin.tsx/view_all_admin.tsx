
import { useEffect, useState } from "react";
import CommonLayout from "../../../views/AdminViews/commonLayout";
import { getAllSubAdmin } from "../../../services/admin.service";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";




const ViewAllAdmin = () => {

    const [adminList, updateAdminList] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        const { data } = await getAllSubAdmin();
        console.log(data);
        updateAdminList(data.data)

    }

    const listofData = adminList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer" onClick={(e:any)=>{
          console.log("click on vessel")
          navigate("/adminDashboard/CreateSubAdmin",{state:{admin:item}})}}>
            <td className="px-6 py-4">{item.firstname} {item.lastname}</td>
          <td className="px-6 py-4">{item.role}</td>
          <td className="px-6 py-4">{item.email}</td>
          <td className="px-6 py-4">{item.phone_no}</td>
        
          <td className="px-6 py-4">
            <Trash2
              onClick={() => {
               
              }}
            />
          </td>
        </tr>
      ));




    return <CommonLayout heading={"View All Admin"}>
         <div className="relative overflow-x-auto mb-3">
        <table className="table-auto w-full text-sm text-left text-grey-500">
          <thead className="text-xs text-grey-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
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
    </CommonLayout>
}

export default ViewAllAdmin;



