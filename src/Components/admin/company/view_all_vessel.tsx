import { useEffect, useState } from "react";
import { getAllVesselById } from "../../../services/admin.service";
import CommonLayout from "../../../views/AdminViews/commonLayout";
import { Trash2 } from "react-feather";


const ViewAllVessel = () => {

    const [vesselList, updateVesselList] = useState([]);


    useEffect(() => {
        fetchData();
    }, [])
    async function fetchData() {
        const { data } = await getAllVesselById();
        console.log(data);
        updateVesselList(data.data)

    }



    const listofData = vesselList.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b">
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.type}</td>
          <td className="px-6 py-4">{item.flag}</td>
          <td className="px-6 py-4">{item.dateOfExpiry}</td>
          <td className="px-6 py-4">{item.sidNumber}</td>
          <td className="px-6 py-4">{item.Indos}</td>
          <td className="px-6 py-4">file</td>
          <td className="px-6 py-4">
            <Trash2
              onClick={() => {
               
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
                Visa type
              </th>
              <th scope="col" className="px-6 py-3">
                Place Of Issue
              </th>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Date Of Issue
              </th>
              <th scope="col" className="px-6 py-3">
                Date Of Expiry
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
