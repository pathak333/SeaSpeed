import { useEffect, useState } from "react";
import { getAllVesselById, searchVesselService } from "../../../../services/admin.service";
import CommonLayout from "../../../../views/AdminViews/commonLayout";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { LOADING } from "../../../../constants/action.constant";
import { useGlobalState } from "../../../../contexts/global.context";
import { debounce } from "lodash";
import InputField from "../../../../uiComponents/inputField/inputField.component";
import { ArrowDropDown } from "@mui/icons-material";


const ViewAllVessel = () => {

  const [vesselList, updateVesselList] = useState([]);
  const navigate = useNavigate()
  const [, dispatch] = useGlobalState();
  const [searchText, updateSearchText] = useState("");
  const [orderBy, updateOrderBy] = useState("");


  useEffect(() => {
    fetchData();
  }, [])


  async function fetchData() {
    dispatch({ type: LOADING, payload: true });
    const { data } = await getAllVesselById();
    if (data) {
      console.log(data);
      updateVesselList(data.data)
    }
    dispatch({ type: LOADING, payload: false });
  }

  //search start

  const search = async () => {

    const payload = {
      searchValue: searchText,
      orderByField: orderBy,
    }
    if (payload.searchValue || payload.orderByField) {
      const { data } = await searchVesselService(payload)
      if (data) {
        console.log(data);
        updateVesselList(data.data)
      }
    } else {
      fetchData()
    }


  }

  // Debounce the handleSearch function
  const debouncedSearch = debounce(search, 800);

  useEffect(() => {
    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchText, orderBy]);

  //search end

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
    <InputField
      fieldName={"Search"}
      label={"Search"}
      type={"Search"}
      onChange={(e: any) => updateSearchText(e.target.value)} />
    <p className="text-xs text-blue-600 mt-1">Search by NAME 	TYPE	FLAG	VESSEL OWNER	IMO NUMBER.</p>
    <div className="relative overflow-x-auto mb-3">
      <table className="table-auto w-full text-sm text-left text-grey-500">
        <thead className="text-xs text-grey-700 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => updateOrderBy(orderBy === 'name' ? "" : 'name')}>
              Name <ArrowDropDown className={`${orderBy === 'name' ? 'rotate-180' : ""} `} />
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => updateOrderBy(orderBy === 'type' ? "" : 'type')}>
              Type <ArrowDropDown className={`${orderBy === 'type' ? 'rotate-180' : ""} `} />
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => updateOrderBy(orderBy === 'flag' ? "" : 'flag')}>
              Flag <ArrowDropDown className={`${orderBy === 'flag' ? 'rotate-180' : ""} `} />
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => updateOrderBy(orderBy === 'company' ? "" : 'company')}>
              vessel owner <ArrowDropDown className={`${orderBy === 'company' ? 'rotate-180' : ""} `} />
            </th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => updateOrderBy(orderBy === 'imoNumber' ? "" : 'imoNumber')}>
              Imo Number <ArrowDropDown className={`${orderBy === 'imoNumber' ? 'rotate-180' : ""} `} />
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
