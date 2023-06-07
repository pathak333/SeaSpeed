import { useEffect, useMemo } from "react";
import {
  Award,
  Briefcase,
  Globe,
  Layout,
  PlusCircle,
  User,
  UserPlus,
  Users,
} from "react-feather";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../smallerComponents/dashboardCard";
import DashboardCard2 from "../smallerComponents/dashboardCard2";
const Dashboard = () => {
  const navigate = useNavigate();


  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    console.log("dashboard component");

    return () => {};
  }, []);

  var state = sessionStorage.getItem("formState");

  const memoizedValue = useMemo(() => {
    var arr = state?.split(",");

    console.log(((10   ?? 0)/16)*100);
    
    return ((arr?.length ?? 0) /16)*100;
  }, [state]);

  return (
    <div className="    ">
      <div className="w-full h-24 bg-white p-4 mb-8 items-baseline inline-grid rounded-lg">
        <p>
          Your Application <span>50% - { memoizedValue}</span>
        </p>
        <div className=" w-full  bg-gray-200 rounded-full h-2.5 dark:bg-gray-200">
          <div
            className={`bg-green-600  h-2.5 rounded-full `}
             style={{"width":memoizedValue}}
          ></div>
        </div>
      </div>
      <div className="flex flex-wrap  justify-center ">
        {/* card */}
        <DashboardCard
          description={
            "kin details, Contact Details, Bank details, Education background"
          }
          icon={<User className="text-IbColor" />}
          label={<span>Personal details</span>}
          onClick={() => {
            navigate("/dashboard/personaldetails");
          }}
        />

        {/* card */}
        {/* card */}
        <DashboardCard
          description={"Passport details, Visa details, seamen book details"}
          icon={<Globe className="text-[#FFAF19]" />}
          label={
            <span>
              Traveling <br /> documents
            </span>
          }
          onClick={() => {
            navigate("/dashboard/traveldetails");
          }}
        />

        {/* card */}
        {/* card */}
        <DashboardCard
          description={
            "Certificate of competency, Flag endorsement, Dangerous cargo endorsement"
          }
          icon={<Award className="text-[#A212E4]" />}
          label={<span>Certificates</span>}
          onClick={() => {navigate("/dashboard/certificates");}}
        />

        {/* card */}
        {/* card */}
        <DashboardCard
          description={"Start with your last vessel served"}
          icon={<Briefcase className="text-[#00E84F]" />}
          label={
            <span>
              Work <br />
              experience
            </span>
          }
          onClick={() => {
            //workExperiance
            navigate("/dashboard/workExperiance");
          }}
        />

        {/* card */}
      </div>
      <div className="h-1 bg-[#E4F0FF] my-8" />
      <div className="flex flex-wrap  justify-center ">
        {/* card */}
        <DashboardCard2
          label={"Course and certificate"}
          icon={<Layout className="" />}
          onClick={() => {
            navigate("/dashboard/courseCertificate");
          }}
        />
        <DashboardCard2
          label={"Medical details"}
          icon={<PlusCircle className="" />}
          onClick={() => {       
            navigate("/dashboard/medicalDetails");
          }}
        />
        <DashboardCard2
          label={"Union Registraion"}
          icon={<Users className="" />}
          onClick={() => {
            navigate("/dashboard/unionRegistrationDetail");
          }}
        />
        <DashboardCard2
          label={"References"}
          icon={<UserPlus className="" />}
          onClick={() => {
            navigate("/dashboard/references");
          }}
        />
        {/* card */}
      </div>
    </div>
  );
};
export default Dashboard;
