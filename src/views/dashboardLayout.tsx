import { Outlet } from "react-router-dom";
import NavbarComponent from "../Components/dashboard/navbar_component";
import { NoPropComponent } from "../types/noProps.type";

const DashboardLayout: NoPropComponent = () => {
  return  <NavbarComponent>
    <Outlet />
  </NavbarComponent>
};

export default DashboardLayout;
