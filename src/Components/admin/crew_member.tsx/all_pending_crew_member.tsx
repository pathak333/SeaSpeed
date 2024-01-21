import { useEffect, useState } from "react";
import { getAllPendingCrew } from "../../../services/admin.service";
import { Trash2 } from "react-feather";
import CommonLayout from "../../../views/AdminViews/commonLayout";

import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../contexts/global.context";
import { toast } from "react-toastify";
import { LOADING } from "../../../constants/action.constant";


const AllPendingCrewMembers = () => {
 

  //getAllCrew
  const [crewList, updateCrewList] = useState([]);
  const navigate = useNavigate();
  const [globalState,dispatch] = useGlobalState();
  const adminData = globalState.data.data;
  useEffect(() => {
    fetchData();
  }, [])
  async function fetchData() {
    dispatch({ type: LOADING, payload: true });
    const { data } = await getAllPendingCrew();
    console.log(data);
    updateCrewList(data.data)
    dispatch({ type: LOADING, payload: false });

  }



  const listofData = crewList.map((item: any, index: any) => {
    console.log(item)
    return <tr key={index} className={`${item.isRequiredDoc ? "bg-green-200 " : "bg-white"}  border-b hover:bg-slate-100 cursor-pointer`}
      onClick={() => {
        if (adminData.permission.includes("application")) {
          navigate("/adminDashboard/crewProfile", { state: { data: item, page: "pending" } });
        } else {
          toast.error("You are not authorized to perform this task");
        }
      }}>
      <td className="px-6 py-4">{item.firstname} {item.lastname}<br /> <span className="text-xs text-textGrey">{item.rank.label}</span></td>
      <td className="px-6 py-4">{item.vessel ? item.vessel.label : "UnAssined"}</td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.phone_no}</td>
      <td className="px-6 py-4">{item.formState.length}</td>

      <td className="px-6 py-4 ">

        <Trash2
          onClick={() => {

          }}
        />
      </td>
    </tr>
  });

  return <>
    <CommonLayout heading={"View All Pending Crew"}>
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
                Available Doc
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


export default AllPendingCrewMembers;