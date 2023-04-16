import { ArrowLeft } from "react-feather";
import { Outlet, useNavigate } from "react-router-dom";


const UnionRegistrationLayout = () => {
    const navigate = useNavigate()

    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    return <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
        <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
            <span className="mr-2">
                <ArrowLeft onClick={() => goBack()} />
            </span>{" "}
            Union Registration
        </p>
        {/* <p className="pl-8 text-[#A5A5A5]">
            Start with your last vessel served
        </p> */}
        <Outlet />
    </div>
}
export default UnionRegistrationLayout