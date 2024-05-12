import { ArrowLeft } from "react-feather"
import { Outlet, useNavigate } from "react-router-dom";



const CompanyLayout = () => {
    const navigate = useNavigate();
    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    return  <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
    <p className="font-medium  text-[22px] leading-none flex flex-row  items-center">
        <span className="mr-2">
            <ArrowLeft onClick={() => goBack()} />
        </span>{" "}
        Add Company
    </p>
    <p className="pl-8 text-[#A5A5A5]">
        Add new company with the required details
    </p>
        <span className="ml-4 text-lg">Vessel Manager details</span>
        <Outlet />
</div>
}

export default CompanyLayout