import { useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";


import DasboardCardLayout from "./dashboard_card_layout";
import { useGlobalState } from "../../contexts/global.context";
import { Description, DocumentScannerRounded } from "@mui/icons-material";
const Dashboard = () => {
  const navigate = useNavigate();
  const [globalState, dispatch] = useGlobalState();
  let data = globalState.data != null ? globalState.data.data : null;
  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    console.log("dashboard component");

    return () => {};
  }, []);

  var state = sessionStorage.getItem("formState");

  const memoizedValue = useMemo(() => {
    console.log(state);
    
    var arr =state ? state?.split(",") : [];

    console.log(arr);
    console.log(arr?.length);
    console.log(((arr?.length ?? 0) / 16) * 100);
    
    
    return ((arr?.length ?? 0) /16)*100;
  }, [state]);

  return (
    <div className="    ">
      <div className="w-full h-24 bg-white p-4 mb-8 items-baseline inline-grid rounded-lg">
        <p>
          Your Application <span>{ memoizedValue > 100 ? 100 : memoizedValue}%</span>
        </p>
        <div className=" w-full  bg-gray-200 rounded-full h-2.5 dark:bg-gray-200 overflow-clip relative">
          <div
            className={`bg-green-600  h-2.5 rounded-full  absolute`}
             style={{"width":memoizedValue*10}}
          ></div>
        </div>
      </div>
    <DasboardCardLayout comeFrom="user" />
   <div id="bottomMenu" className="flex flex-row">
   <div className="mb-5 mt-2 flex flex-col px-3 pt-3 ml-2 rounded-lg bg-white w-[260px] items-center">
      <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="seaSpeed Profile " className="p-3 w-24 h-24 rounded-full" />
     
     <p id="name" className="h-5">{data !== null ? data.firstname : ""} {data != null ? data.lastname : ""}</p>
      <p id="name" className="text-slate-400 font-semibold pb-2 text-sm">{data !== null ? data.vessel.label : ""}</p>
      <hr className=" w-full" />
      <p id="name" className="p-2 text-sm">{data !== null ?data.joiningDate : ""}</p>
      <hr className=" w-full " />
      <p id="name" className="p-2 text-sm">{data !== null ?data.joiningPort : ""}</p>
     
    </div>
    <div id="agrement" className="mb-5 mt-2 flex flex-col px-3 pt-3 ml-2 rounded-lg bg-white w-[260px] items-center">
    <Description width={"20px"}/>
    </div>
   </div>
    </div>
  );
};
export default Dashboard;
