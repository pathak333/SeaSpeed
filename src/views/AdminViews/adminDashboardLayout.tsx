import { Outlet } from "react-router-dom";
import NavbarComponent from "../../Components/dashboard/navbar_component";
import { NoPropComponent } from "../../types/noProps.type";
import { useEffect } from "react";

import { DATA, LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import { adminProfileService } from "../../services/admin.service";



const AdminDashboardLayout: NoPropComponent = () => { 
  const [globalState, dispatch] = useGlobalState();

  useEffect(() => {

   
   

    // return () => {
    //   second
    // }
  }, []);

  
    return  <NavbarComponent name="Admin Dashboard">
    <Outlet />
  </NavbarComponent>
}

export default AdminDashboardLayout
