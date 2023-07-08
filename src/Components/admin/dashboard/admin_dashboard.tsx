
import DashboardCard from "../../smallerComponents/dashboardCard";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Business, Contacts, DirectionsBoatRounded, Domain, People, PersonAdd, SupervisedUserCircleRounded } from "@material-ui/icons";
import DashboardCard2 from "../../smallerComponents/dashboardCard2";
import { Sailing } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



const AdminDashboard = () => {
  const navigate = useNavigate()

    return <>
     <div className="flex flex-wrap  justify-center ">
        {/* card */}
        <DashboardCard
          description={
            "Create new user and generate login credentials"
          }
          icon={<PersonAdd className="text-IbColor" />}
          label={<span>Create new crew member</span>}
          onClick={() => {
            navigate("/adminDashboard/createCrew");
          }}
        />
        <DashboardCard
          description={
            "Create new admin and generate login credentials"
          }
          icon={<AdminPanelSettingsIcon className="text-[#FFAF19]" />}
          iconbg="bg-[#FFEECE]"
          label={<span>Create sub admin</span>}
          onClick={() => {
            navigate("/adminDashboard/createSubAdmin");
          }}
        />
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
      </div>
      <div className="h-1 bg-[#E4F0FF] my-8" />
      <div className="flex flex-wrap  justify-center ">
        {/* card */}
        <DashboardCard2
          label={"All crew members"}
          icon={<People className="" />}
          onClick={() => {
          navigate("/adminDashboard/allCrewMember");
          }}
        />
        <DashboardCard2
          label={"All admins"}
          icon={<SupervisedUserCircleRounded className="" />}
          onClick={() => {
            navigate("/adminDashboard/viewAllAdmin");
          }}
        />
        <DashboardCard2
          label={"View all vessels"}
          icon={<Sailing className="" />}
          onClick={() => {
           navigate("/adminDashboard/viewVessel");
          }}
        />
        <DashboardCard2
          label={"Pending verification"}
          icon={<Contacts className="" />}
          onClick={() => {
            //navigate("/dashboard/courseCertificate");
          }}
        />
        <DashboardCard2
          label={"View all companies"}
          icon={<Business className="" />}
          onClick={() => {
            //navigate("/dashboard/courseCertificate");
          }}
        />
      </div>
    </>
}

export default AdminDashboard;