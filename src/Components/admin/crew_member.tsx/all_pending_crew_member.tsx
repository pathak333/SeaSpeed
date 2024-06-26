import { ChangeEvent, useEffect, useState } from "react";
import { getAllPendingCrew, searchPendingCrew } from "../../../services/admin.service";
import { Minus, Plus, Trash2 } from "react-feather";
import CommonLayout from "../../../views/AdminViews/commonLayout";

import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../contexts/global.context";
import { toast } from "react-toastify";
import { LOADING, TEMP } from "../../../constants/action.constant";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { debounce } from 'lodash';
import { ArrowDropDown } from "@mui/icons-material";
import Pagination from "../../../uiComponents/pagination_new";
// import Pagination from "../../../uiComponents/pagination";


const AllPendingCrewMembers = () => {


  //getAllCrew
  const [pageno, updatepageno] = useState(1);
  const [perpage, updateperpage] = useState(20);
  const [totalpageno, updatetotalpageno] = useState(1);
  const [searchText, updateSearchText] = useState("");
  const [orderBy, updateOrderBy] = useState("");

  const [crewList, updateCrewList] = useState([]);
  const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();
  const adminData = globalState.data.data;




  useEffect(() => {
    if (pageno > 0) {
      fetchData();
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [pageno, perpage])


  async function fetchData() {
    dispatch({ type: LOADING, payload: true });
    const { data } = await getAllPendingCrew(pageno, perpage);
    if (data) {

    console.log(data);
    updateCrewList(data.data.userData)
    updatetotalpageno(Math.ceil(data.data.totalCount / perpage))
  
    }
    dispatch({ type: LOADING, payload: false });
      
  }




  // function changepageno(type: any) {
  //   if (!type) {
  //     if (pageno < totalpageno) {
  //       updatepageno(pageno + 1)
  //     }
  //   } else {
  //     if (pageno > 0) {
  //       updatepageno(pageno - 1)
  //     }
  //   }

  // }
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalpageno) return;
    updatepageno(page);
  };


  const search = async () => {
    
    const payload = {
      searchValue: searchText,
      orderByField: orderBy,
      isPending:true
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




  const listofData = crewList.map((item: any, index: any) => {
  //  console.log(item)
    return <tr key={index} className={`${item.isRequiredDoc ? "bg-green-200 " : "bg-white"}  border-b hover:bg-slate-100 cursor-pointer`}
      onClick={() => {
        if (adminData?.permission.includes("application")) {
          dispatch({ type: TEMP, payload: {...globalState.temp,data:item,page:"pending"} });
          navigate(`/adminDashboard/crewProfile/${item._id}/pending`);
          // , { state: { data: item, page: "pending" } }
        } else {
          toast.error("You are not authorized to perform this task");
        }
      }}>
      <td className="pl-6 pr-2 py-4">{item.firstname} {item.lastname}<br /> <span className="text-xs text-textGrey">{item.rank.label}</span></td>
      <td className="pl-6 pr-2 py-4">{item.vessel ? item.vessel.label : "UnAssined"}</td>
      <td className="pl-6 pr-2 py-4">{item.email}</td>
      <td className="pl-6 pr-2 py-4">{item.phone_no}</td>
      <td className="pl-6 pr-2 py-4">{item.formState.length}</td>

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
      <InputField
        fieldName={"Search"}
        label={"Search"}
        type={"Search"}
        onChange={(e: any) => updateSearchText(e.target.value)} />
      <p className="text-xs text-blue-600 mt-1">Search by Name, Email, Phone,Rank or Vessel.</p>
      <div className="relative overflow-x-auto mb-3 mt-3">
        <table className="table-auto w-full text-sm text-left text-grey-500">
          <thead className="text-xs text-grey-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'firstname' ? "" : 'firstname')}>
                Name  <ArrowDropDown className={`${orderBy === 'firstname' ? 'rotate-180' : ""} `} />
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'vessel.label' ? "" :'vessel.label')}>
                Vessel assigned  <ArrowDropDown className={`${orderBy === 'vessel.label' ? 'rotate-180' : ""} `} />
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'email' ? "" :'email')}>
                Email <ArrowDropDown className={`${orderBy === 'email' ? 'rotate-180' : ""} `} />
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={()=>updateOrderBy(orderBy === 'phone_no' ? "" :'phone_no')}>
                Phone  <ArrowDropDown className={`${orderBy === 'phone_no' ? 'rotate-180' : ""} `} />
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
      <br />
      {/* <div className="page flex flex-row w-40 place-content-between p-3 mx-auto mt-3 border shadow">
        <div>
          <Plus className="scale-150" onClick={() => changepageno(1)} />
        </div>
        <p className="font-bold text-xl">{pageno}/{totalpageno}</p>
        <div>
          <Minus className="scale-150" onClick={() => changepageno(0)} />
        </div>
      </div> */}
      <Pagination currentPage={pageno} onPageChange={handlePageChange} totalPages={totalpageno} />
    </CommonLayout>
  </>
}


export default AllPendingCrewMembers;