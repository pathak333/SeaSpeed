import { Business, DirectionsBoatRounded } from "@mui/icons-material";
import { useState } from "react";
import { ArrowLeft } from "react-feather";
import { Outlet, useNavigate } from "react-router-dom";

const ExpireDocLayout = () => {
    const navigate = useNavigate();
    const [currentList, setCurrentList] = useState("vessel")



    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }

    return <>
        <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] pb-0 max-sm:p-[20px]">
            <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
                <span className="mr-2">
                    <ArrowLeft onClick={() => goBack()} />
                </span>{" "}
                Expire Documents
            </p>
            <p className="pl-8 text-[#A5A5A5]">
                See all expire Documents with the required details
            </p>



            <div className="w-full mb-4 flex flex-row justify-between items-center">
                <p className={`text-lg ml-2 cursor-pointer ${currentList === "vessel" ? "border-b-4 border-blue-400" : "text-gray-500"}`} onClick={() => (navigate("/adminDashboard/viewAllExpireDoc"), setCurrentList("vessel"))}>Vessel Expire Docs</p>
                <p className={`text-lg ml-2 cursor-pointer ${currentList === "company" ? "border-b-4 border-blue-400" : " text-gray-500"}`} onClick={() => (navigate("/adminDashboard/viewAllExpireDoc/companyDocs"), setCurrentList("company"))}>Company Expire Docs</p>
                <p className={`text-lg ml-2 cursor-pointer ${currentList === "user" ? "border-b-4 border-blue-400" : " text-gray-500"}`} onClick={() => (navigate("/adminDashboard/viewAllExpireDoc/companyDocs"), setCurrentList("user"))}>User Expire Docs</p>
            </div>


        </div>

        {/* <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">

                    <li className="me-2" onClick={() => navigate("/adminDashboard/viewAllExpireDoc")}>
                        <div className="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                            <DirectionsBoatRounded /> &nbsp;Vessel
                        </div>
                    </li>
                    <li className="me-2" onClick={() => navigate("/adminDashboard/viewAllExpireDoc/companyDocs")}>
                        <div className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                            <Business className="" />&nbsp; Company
                        </div>
                    </li>
                    <li className="me-2" onClick={() => navigate("")}>
                        <div className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                            <svg className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>User
                        </div>
                    </li>
                   
                </ul>
            </div> */}
        <Outlet />
    </>

}

export default ExpireDocLayout