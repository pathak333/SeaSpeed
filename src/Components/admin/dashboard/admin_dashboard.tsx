
import DashboardCard from "../../smallerComponents/dashboardCard";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Business, Contacts, ControlPoint, DirectionsBoatRounded, DockRounded, Domain, People, PersonAdd, SupervisedUserCircleRounded } from "@mui/icons-material";
import DashboardCard2 from "../../smallerComponents/dashboardCard2";
import { Sailing } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../../contexts/global.context";
// import GenratePdf from "../contract_pdf/genratePdf";



const AdminDashboard = () => {
  const navigate = useNavigate()
  const [globalState, dispatch] = useGlobalState();
  let data = globalState.data != null ? globalState.data.data : null;

    return <>
   { data && ( data['permission'].includes("admin") || data.role === "superadmin" ) && <div className="flex flex-wrap  justify-center ">
        {/* card */}
        <DashboardCard
          description={
            "Create new user and generate login credentials"
          }
          icon={<PersonAdd className="text-IbColor " />}
         
          label={<span>Create crew member</span>}
          onClick={() => {
            navigate("/adminDashboard/createCrew");
          }}
        />
        {data &&  data.role === "superadmin" && <DashboardCard
          description={
            "Create new admin and generate login credentials"
          }
          icon={<AdminPanelSettingsIcon className="text-[#FFAF19]" />}
          iconbg="bg-[#FFEECE]"
          label={<span>Create sub admin</span>}
          onClick={() => {
            navigate("/adminDashboard/createSubAdmin");
          }}
        />}
        <DashboardCard
          description={
            "Add new company with the required details"
          }
          icon={<Domain className="text-[#A212E4]" />}
          iconbg="bg-[#ECC5FF]"
          label={<span>Add Company</span>}
          onClick={() => {
            navigate("/adminDashboard/addCompany");
          }}
        />
        <DashboardCard
          description={
            "Add new vessel with the required details"
          }
          icon={<DirectionsBoatRounded  className="text-[#3C00E8]" />}
          iconbg="bg-[#D8D5FA]"
          label={<span>Add vessel</span>}
          onClick={() => {
            navigate("/adminDashboard/addVessel");
          }}
        />
      </div>}
      <div className="h-1 bg-[#E4F0FF] my-8" />
      <div className="flex flex-wrap  justify-center ">
        {/* card */}
      {data &&  (data['permission'].includes("application") || data['permission'].includes("vessel") || data.role === "superadmin" ) &&  <DashboardCard2
          label={"Approved crew"}
          icon={<People className="text-IbColor " />}
          iconbg=""
          onClick={() => {
          navigate("/adminDashboard/allCrewMember");
          }}
        />}
      {data &&  data.role === "superadmin"  &&  <DashboardCard2
          label={"All admins"}
          icon={<SupervisedUserCircleRounded className="text-[#FFAF19]" />}
          iconbg="bg-[#FFEECE]"
          onClick={() => {
            navigate("/adminDashboard/viewAllAdmin");
          }}
        />}
         { data &&  (data['permission'].includes("admin") || data.role === "superadmin" ) && <DashboardCard2
          label={"View all companies"}
          icon={<Business className="text-[#A212E4]" />}
          iconbg="bg-[#ECC5FF]"
          onClick={() => {
            navigate("/adminDashboard/viewAllCompany");
          }}
        />}
       {data &&  (data['permission'].includes("vessel") || data['permission'].includes("admin") || data.role === "superadmin" ) && <DashboardCard2
          label={"View all vessels"}
          icon={<Sailing className="text-[#3C00E8]" />}
          iconbg="bg-[#D8D5FA]"
          onClick={() => {
           navigate("/adminDashboard/viewVessel");
          }}
        />}
      {data &&  (data['permission'].includes("application")  || data['permission'].includes("vessel") || data.role === "superadmin" )  &&  <DashboardCard2
          label={"Pending verification"}
          icon={<Contacts className="" />}
          onClick={() => {
            //allPendinCrewMember
            navigate("/adminDashboard/allPendinCrewMember");
          }}
        />}
     
        <DashboardCard2
          label={"Manage Contract"}
          icon={<ControlPoint className="" />}
          onClick={() => {
            navigate("/adminDashboard/AllContractAdmin");
          }}
        />
        <DashboardCard2
          label={"All Expire Doc"}
          icon={<DockRounded className="" />}
          onClick={() => {
            navigate("/adminDashboard/viewAllExpireDoc");
          }}
        />
        {/* <GenratePdf /> */}

      </div>
    </>
}

export default AdminDashboard;