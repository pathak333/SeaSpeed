import { useEffect, useState } from "react";
import { getAllCrew } from "../../../services/admin.service";
import { Trash2 } from "react-feather";
import CommonLayout from "../../../views/AdminViews/commonLayout";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LOADING } from "../../../constants/action.constant";
import { useGlobalState } from "../../../contexts/global.context";


const AllCrewMembers = () => {
  const [globalState, dispatch] = useGlobalState();

    //getAllCrew
    const [crewList, updateCrewList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [])
  async function fetchData() {
    dispatch({ type: LOADING, payload: true });
        const { data } = await getAllCrew();
        console.log(data);
        updateCrewList(data.data)
        dispatch({ type: LOADING, payload: false });

    }



  const listofData = crewList.map((item: any, index: any) => {
    console.log(item)
  return  <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer" onClick={() => {
    navigate("/adminDashboard/crewProfile",{state:{data:item,page:"allCrew"}});
   }}>
      <td className="px-6 py-4">{item.firstname} {item.lastname}<br /> <span className="text-xs text-textGrey">{ item.rank.label}</span></td>
          <td className="px-6 py-4">{item.vessel ? item.vessel.label : "UnAssined"}</td>
          <td className="px-6 py-4">{item.email}</td> 
       <td className="px-6 py-4">{item.phone_no}</td>
        
    <td className="px-6 py-4 ">
     
        <Trash2
          onClick={() => {
               
          }}
        />
      </td>
    </tr>
  });



    return <>
        <CommonLayout heading={"View All Crew"}>
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
    </CommonLayout>
    </>
}


export default AllCrewMembers;