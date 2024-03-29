import { useEffect, useState } from "react";
import { getAllVesselById } from "../../../../services/admin.service";
import CommonLayout from "../../../../views/AdminViews/commonLayout";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { LOADING } from "../../../../constants/action.constant";
import { useGlobalState } from "../../../../contexts/global.context";


const ViewAllVessel = () => {

  const [vesselList, updateVesselList] = useState([]);
  const navigate = useNavigate()
  const [, dispatch] = useGlobalState();

  useEffect(() => {
    fetchData();
  }, [])


  async function fetchData() {
    dispatch({ type: LOADING, payload: true });
    const { data } = await getAllVesselById();
    console.log(data);
    updateVesselList(data.data)
    dispatch({ type: LOADING, payload: false });
  }



  const listofData = vesselList.map((item: any, index: any) => (
    <tr title={`Crew Manager: ${item.crewManagerId && item.crewManagerId.label} \nShip Manager: ${item.shipManagerId && item.shipManagerId.label} \nCrew Agency: ${item.crewAgencyManagerId && item.crewAgencyManagerId.label}`} key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer" onClick={(e: any) => {
      console.log("click on vessel")
      navigate("/adminDashboard/vesselProfile", { state: { id: item._id } })
    }}>
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.type}</td>
      <td className="px-6 py-4">{item.flag}</td>
      <td className="px-6 py-4">{item.company.label}</td>
      <td className="px-6 py-4">{item.imoNumber}</td>
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



  return <CommonLayout heading={"View All Vessel"} subHeading={"Vessel and their details"} lastHeading={""}>
    <div className="relative overflow-x-auto mb-3">
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
              vessel owner
            </th>
            <th scope="col" className="px-6 py-3">
              Imo Number
            </th>
            {/* <th scope="col" className="px-6 py-3">
              File
            </th> */}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {vesselList.length > 0 ? (<tbody>{listofData}</tbody>) : (<tr className="text-center"><td colSpan={7} className="text-lg">You have no vessel assigned yet</td></tr>)}

      </table>
    </div>
  </CommonLayout>
}

export default ViewAllVessel;
