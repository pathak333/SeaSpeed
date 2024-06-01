import { ArrowLeft } from "react-feather";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGlobalState } from "../contexts/global.context";

const MedicalDetailsLayout = () => {
    const navigate = useNavigate()
    const [globalState,] = useGlobalState()

    //get query parameters 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');




    function goBack() {
        if (globalState.data.data.role === "admin" || globalState.data.data.role === "superadmin") {
            navigate(-1)
        } else {
            navigate("/dashboard/home", { replace: true });
        }
    }


    return <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
        <div className="flex justify-between items-center">
            <div>
                <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
                    <span className="mr-2">
                        <ArrowLeft onClick={() => goBack()} />
                    </span>{" "}
                    Medical details
                </p>
            </div>
            {id && <p className=" text-[25px] font-bold text-gray-200 leading-none items-start justify-start">{`${globalState?.temp?.data?.firstname} ${globalState?.temp?.data?.lastname} - `}<span className="text-sm">{globalState?.temp?.data?.rank?.label}</span></p>}
        </div>
        <Outlet />
    </div>
}
export default MedicalDetailsLayout;
