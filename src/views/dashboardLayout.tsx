// import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../Components/dashboard/navbar_component";
// import { DATA, LOADING } from "../constants/action.constant";
// import { useGlobalState } from "../contexts/global.context";
// import { ProfileService, getUserInstruction, updateInstructionUser } from "../services/user.service";
import { NoPropComponent } from "../types/noProps.type";
// import { toast } from "react-toastify";


const DashboardLayout: NoPropComponent = () => {
 // const [globalState, dispatch] = useGlobalState();
  // useEffect(() => {
  //   console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    
  //  //fetchAll()
 

  //   // return () => {
  //   //   second
  //   // }
  // }, []);

 

  return (
    <NavbarComponent>
      <Outlet />
    </NavbarComponent>
  );
};

export default DashboardLayout;
