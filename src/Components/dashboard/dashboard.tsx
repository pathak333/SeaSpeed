import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";


import DasboardCardLayout from "./dashboard_card_layout";
import { useGlobalState } from "../../contexts/global.context";

import { FileText } from "react-feather";
import { TodayDate } from "../../constants/values.constants";
import InputField from "../../uiComponents/inputField/inputField.component";
import { getAllFile } from "../../services/user.service";



const Dashboard = () => {
  // const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();
  let data = globalState.data != null ? globalState.data.data : null;
  const [allFile, updateAllFile] = useState([])

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    console.log("dashboard component");
    fetchAllDoc()
    return () => { };
  }, []);


  async function fetchAllDoc() {
    const { data } = await getAllFile();
    console.log(data)
    updateAllFile(data.data)
  }

  var state = sessionStorage.getItem("formState");

  const memoizedValue = useMemo(() => {
    console.log(state);

    var arr = state ? state?.split(",") : [];

    console.log(arr);
    console.log(arr?.length);
    console.log(((arr?.length ?? 0) / 15) * 100);


    return ((arr?.length ?? 0) / 15) * 100;
  }, [state]);

  return (
    <div className="    ">
      <div className="w-full h-fit bg-white p-4 mb-8 items-baseline inline-grid rounded-lg">
        {data != null && !data.isRequiredDoc && <p>
          Your Application <span>{memoizedValue > 100 ? 100 : memoizedValue.toFixed(2)}%</span>
        </p>}
        {data != null && data.isRequiredDoc && <p>Well done! you have completed your application</p>}
        <div className=" w-full  bg-gray-200 rounded-full h-2.5 dark:bg-gray-200 overflow-clip relative">
          <div
            className={`bg-green-600  h-2.5 rounded-full  absolute`}
            style={{ "width": `${memoizedValue}%` }}
          ></div>
        </div>
        {data != null && data.isRequiredDoc && <button className=" w-1/5 h-10 mt-3 hover:bg-blue-700 text-sm border border-blue-500 bg-blue-500 text-white active:bg-blue-500 font-bold px-3  rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Submit my applicaiton</button>}
      </div>
      <DasboardCardLayout comeFrom="user" />
      <div id="bottomMenu" className="flex flex-wrap">
        <div className="mb-5 mt-2 flex flex-col px-3 pt-3 ml-2 rounded-lg bg-white w-[260px] max-sm:w-full items-center">
          <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="seaSpeed Profile " className="p-3 w-24 h-24 rounded-full" />

          <p id="name" className="h-5">{data !== null ? data.firstname : ""} {data != null ? data.lastname : ""}</p>
          <p id="name" className="text-slate-400 font-medium pb-2 text-sm">{data !== null && data.hasOwnProperty('vessel') && data.vessel.hasOwnProperty("value") ? data.vessel.label : ""}</p>
          <hr className=" w-full" />
          {data !== null && data.joiningDate
            ? <p id="name" className="p-2 text-sm">{data !== null ? data.joiningDate : ""}</p>
            : <InputField
              className="m-4"
              fieldName={"availability"}
              label={"Availability"}
              type={"date"}
              min={TodayDate}
              // error={errorReturn("dob")}
              onChange={(e) => console.log(e.target.value)}
            //  value={formEvent.dob.split("T")[0]}
            />
            //  : <div ><span className="text-IbColor" >Availability</span><input className="focus-visible:border-none focus-visible:outline-none" type="date" min={TodayDate} name="date" id="" /></div> 
          }
          {/* <p id="name" className="p-2 text-sm">{data !== null ?data.joiningDate : ""}</p> */}
          <hr className=" w-full " />
          <p id="name" className="p-2 text-sm">{data !== null ? data.joiningPort : ""}</p>

        </div>
        <div id="agrement" className="mb-5 mt-2 flex flex-col px-3 pt-3 ml-2 rounded-lg bg-white w-[260px] max-sm:w-full items-center">
          <FileText width={"100px"} height={"100px"} className="text-activeIconColor mb-2" />
          <button className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Download agreement</button>
          <button className="text-activeIconColor my-3 ">Upload signed agreement</button>
        </div>
        <div id="agrement" className="mb-5 mt-2 flex flex-col px-3 pt-3 ml-2 rounded-lg bg-white  h-80 overflow-auto max-sm:w-full items-center">
          <h1>All Documents</h1>
          <table className="table-auto w-full text-sm text-left text-grey-500">
            <thead className="text-xs text-grey-700 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Expire
                </th>
              </tr>
            </thead>
            <tbody>
              {allFile.map((item: any, index: any) => (
                
                <tr key={index} className="bg-[#E4F0FF] border-b-8 border-white text-IbColor" onClick={()=>window.location.href=item.link}>
                  <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.expire && item.expire.split('T')[0]}</td></tr>
               
              ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
