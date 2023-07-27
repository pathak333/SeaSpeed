import { User, Globe, Award, Briefcase, Layout, PlusCircle, Users, UserPlus } from "react-feather";
import DashboardCard from "../smallerComponents/dashboardCard";
import DashboardCard2 from "../smallerComponents/dashboardCard2";
import { useNavigate } from "react-router-dom";

interface Props{
    className?: string,
    comeFrom: string,
  id?: string,
  data?:any
}

const DasboardCardLayout = ({className,comeFrom,id,data}:Props) => {
    const navigate = useNavigate();


    return <div className={className + "mb-4"}>
      <div className="flex flex-wrap  justify-start ">
        {/* card */}
        <DashboardCard
          description={
            "kin details, Contact Details, Bank details, Education background"
          }
          icon={<User className="text-IbColor" />}
          label={<span>Personal details</span>}
                onClick={() => {
                    if (comeFrom === "admin") {
                        navigate(`/adminDashboard/personaldetails/?id=${id}`,{state:{crew:data}});
                    } else {
                        navigate("/dashboard/personaldetails");
                        
              }
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
                    if (comeFrom === "admin") { 
                        navigate(`/adminDashboard/traveldetails/?id=${id}`,{state:{crew:data}});
                    } else {
                        navigate("/dashboard/traveldetails");
              }
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
          onClick={() => {
            if (comeFrom === "admin") {
              navigate(`/adminDashboard/certificates/?id=${id}`,{state:{crew:data}});
            } else {
              navigate("/dashboard/certificates");
            }
          }}
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
            if (comeFrom === "admin") {
              navigate(`/adminDashboard/workExperiance/?id=${id}`,{state:{crew:data}});
            } else {
              navigate("/dashboard/workExperiance");

            }
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
            if (comeFrom === "admin") {
              navigate(`/adminDashboard/courseCertificate/?id=${id}`,{state:{crew:data}});
            } else {
              navigate("/dashboard/courseCertificate");
            }
          }}
        />
        <DashboardCard2
          label={"Medical details"}
          icon={<PlusCircle className="" />}
          onClick={() => {       
            if (comeFrom === "admin") {
              navigate(`/adminDashboard/medicalDetails/?id=${id}`,{state:{crew:data}});
            } else {
              navigate("/dashboard/medicalDetails");
            }
          }}
        />
        <DashboardCard2
          label={"Union Registraion"}
          icon={<Users className="" />}
          onClick={() => {
            if (comeFrom === "admin") {
              navigate(`/adminDashboard/unionRegistrationDetail/?id=${id}`,{state:{crew:data}});
            } else {
              navigate("/dashboard/unionRegistrationDetail");
            }
          }}
        />
        <DashboardCard2
          label={"References"}
          icon={<UserPlus className="" />}
          onClick={() => {
            if (comeFrom === "admin") {
              navigate(`/adminDashboard/references/?id=${id}`,{state:{crew:data}});
            } else {
              navigate("/dashboard/references");
            }
          }}
        />
        {/* card */}
      </div></div>
}
export default DasboardCardLayout;