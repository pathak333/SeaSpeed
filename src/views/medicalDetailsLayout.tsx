import { ArrowLeft } from "react-feather";
import { Outlet, useNavigate } from "react-router-dom";

const MedicalDetailsLayout = () => {
    const navigate = useNavigate()

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    return <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
        <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
            <span className="mr-2">
                <ArrowLeft onClick={() => goBack()} />
            </span>{" "}
            Medical details
        </p>
       
        <Outlet />
    </div>
}
export default MedicalDetailsLayout;
