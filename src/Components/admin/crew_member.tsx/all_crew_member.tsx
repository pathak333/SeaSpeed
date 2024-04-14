import { useEffect, useState } from "react";
import { getAllCrew, searchPendingCrew } from "../../../services/admin.service";
import { Trash2 } from "react-feather";
import CommonLayout from "../../../views/AdminViews/commonLayout";

import { useNavigate } from "react-router-dom";
import { LOADING } from "../../../constants/action.constant";
import { useGlobalState } from "../../../contexts/global.context";
import { displayDate } from "../../../constants/commonFunction";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { debounce } from "lodash";
import { ArrowDropDown } from "@mui/icons-material";


const AllCrewMembers = () => {
  const [globalState, dispatch] = useGlobalState();
  const [searchText, updateSearchText] = useState("");
  const [orderBy, updateOrderBy] = useState("");

  //getAllCrew
  const [crewList, updateCrewList] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchData();
  }, [])

  //search start
  
  const search = async () => {
    
    const payload = {
      searchValue: searchText,
      orderByField: orderBy,
      isPending:false
    }
    if (payload.searchValue || payload.orderByField) {
      const { data } = await searchPendingCrew(payload)
      if (data) {
        console.log(data);
        updateCrewList(data.data)
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
}, [searchText,orderBy]);
//search end


  async function fetchData() {
    dispatch({ type: LOADING, payload: true });
    const { data } = await getAllCrew();
    if (data) {
      console.log(data);
    updateCrewList(data.data)

    }
    
    dispatch({ type: LOADING, payload: false });
  }


  function calPer(value: any) {


    console.log(((value?.length ?? 0) / 15) * 100);


    return ((value?.length ?? 0) / 15) * 100;
  }


  const listofData = crewList.map((item: any, index: any) => {
    console.log(item)
    return <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer" onClick={() => {
      navigate("/adminDashboard/crewProfile", { state: { data: item, page: "allCrew" } });
    }}>
      <td className="px-3 py-4 max-w-[130px] truncate">{item.firstname} {item.lastname}<br /> <span className="text-xs text-textGrey">{item.rank.label}</span></td>
      <td className="px-3 py-4">{item.vessel ? item.vessel.label : "UnAssined"}<br /> {displayDate(item.joiningDate)}</td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.phone_no}</td>
      <td className="pl-6 pr-2 py-4">
        {/* {item.formState.length} */}
        <div className="card__indicator">
          <span className="card__indicator-amount">{item.formState.length}</span> Docs / &nbsp;
          <span className="card__indicator-percentage">{calPer(item.formState).toFixed(2)}&nbsp;%</span>
        </div>
        <div className="card__progress">
          <progress max={15} value={item.formState.length}></progress>
        </div>
      </td>
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
      <InputField
        fieldName={"Search"}
        label={"Search"}
        type={"Search"}
        onChange={(e: any) => updateSearchText(e.target.value)} />
      <p className="text-xs text-blue-600 mt-1">Search by Name, Email, Phone, or Vessel.</p>
      <div className="relative overflow-x-auto mb-3">
        <table className="table-auto w-full text-sm text-left text-grey-500">
          <thead className="text-xs text-grey-700 uppercase ">
            <tr>
              <th scope="col" className="px-3 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'firstname' ? "" : 'firstname')}>
                Name <ArrowDropDown className={`${orderBy === 'firstname' ? 'rotate-180' : ""} `} />
              </th>
              <th scope="col" className="px-3 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'vessel.label' ? "" :'vessel.label')}>
                Vessel assigned <ArrowDropDown className={`${orderBy === 'vessel.label' ? 'rotate-180' : ""} `} />
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'email' ? "" :'email')}>
                Email <ArrowDropDown className={`${orderBy === 'email' ? 'rotate-180' : ""} `} />
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'phone_no' ? "" :'phone_no')}>
                Phone <ArrowDropDown className={`${orderBy === 'phone_no' ? 'rotate-180' : ""} `} />
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={()=>updateOrderBy('')}>
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


export default AllCrewMembers;