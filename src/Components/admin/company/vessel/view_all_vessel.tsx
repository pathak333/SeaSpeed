import { useEffect, useState } from "react";
import { getAllVesselById } from "../../../../services/admin.service";
import CommonLayout from "../../../../views/AdminViews/commonLayout";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";


const ViewAllVessel = () => {

    const [vesselList, updateVesselList] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        const { data } = await getAllVesselById();
        console.log(data);
        updateVesselList(data.data)

    }



    const listofData = vesselList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b" onClick={(e:any)=>{
          console.log("click on vessel")
          navigate("/adminDashboard/vesselProfile")}}>
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.type}</td>
          <td className="px-6 py-4">{item.flag}</td>
          <td className="px-6 py-4">{item.company.label}</td>
          <td className="px-6 py-4">{item.imoNumber}</td>
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
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Imo Number
              </th>
              <th scope="col" className="px-6 py-3">
                File
              </th>
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
