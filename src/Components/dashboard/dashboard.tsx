import { useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";


import DasboardCardLayout from "./dashboard_card_layout";
const Dashboard = () => {
  const navigate = useNavigate();


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
    <div className="card flex flex-col p-3 ml-2 rounded-lg bg-white w-[260px] items-center">
      <img src="" alt="seaSpeed Profile " className="p-3" />
      <hr className=" w-full" />
      <p id="name" className="p-3">Abhay pathak</p>
      <hr className=" w-full" />
      <p id="name" className="p-3">Vessel name</p>
      <hr className=" w-full" />
      <p id="name" className="p-3">SignIn Date</p>
      <hr className=" w-full" />
      <p id="name" className="p-3">SignOff Date</p>
      <hr className=" w-full" />
    </div>
    </div>
  );
};
export default Dashboard;
