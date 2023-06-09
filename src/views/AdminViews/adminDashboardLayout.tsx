import { Outlet } from "react-router-dom";
import NavbarComponent from "../../Components/dashboard/navbar_component";
import { NoPropComponent } from "../../types/noProps.type";



const AdminDashboardLayout: NoPropComponent = () => { 
    return  <NavbarComponent name="Admin Dashboard">
    <Outlet />
  </NavbarComponent>
}

export default AdminDashboardLayout
