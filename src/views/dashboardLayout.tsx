import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../Components/dashboard/navbar_component";
import { DATA } from "../constants/action.constant";
import { useGlobalState } from "../contexts/global.context";
import { ProfileService } from "../services/user.service";
import { NoPropComponent } from "../types/noProps.type";

const DashboardLayout: NoPropComponent = () => {
  const [globalState, dispatch] = useGlobalState();

  useEffect(() => {
    async function fetchdata() {
      const { data } = await ProfileService();
      console.log("profile data", data);
      dispatch({ type: DATA, payload: data });
    }
    setTimeout(() => {
      fetchdata();
    }, 800);

    // return () => {
    //   second
    // }
  }, []);

  return (
    <NavbarComponent>
      <Outlet />
    </NavbarComponent>
  );
};

export default DashboardLayout;
