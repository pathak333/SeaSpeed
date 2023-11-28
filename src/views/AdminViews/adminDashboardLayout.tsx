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
    async function fetchdata() {
      dispatch({ type: LOADING, payload: true });
      const { data } = await adminProfileService();
      console.log("profile data", data);
      sessionStorage.setItem("formState", data.data.formState)
      dispatch({ type: DATA, payload: data });
      dispatch({ type: LOADING, payload: false });
    }
    if (globalState.data == null) {
      setTimeout(() => {
        fetchdata();
      }, 800);
    }
   

    // return () => {
    //   second
    // }
  }, []);
    return  <NavbarComponent name="Admin Dashboard">
    <Outlet />
  </NavbarComponent>
}

export default AdminDashboardLayout
