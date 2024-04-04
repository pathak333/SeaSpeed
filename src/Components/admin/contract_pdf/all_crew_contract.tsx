import { useLocation, useNavigate } from "react-router-dom";
import CommonLayout from "../../../views/AdminViews/commonLayout"

import { displayDate } from "../../../constants/commonFunction";




export default function AllCrewContract() {

    const navigate = useNavigate();

    const location = useLocation();
    const { userdata, contractData } = location.state;



    console.log(contractData);

    console.log(userdata);



    return <>
        <CommonLayout heading={"View All Contract of"} gobackone subHeading={"Active Contract is display in green and rest is in blue"}>
        
        <div className="grid m-3 grid-cols-3 gap-y-3">
            {contractData && Object.values(contractData).map((item: any, index: any) => (
                //         <div key={index} className="max-w-72 bg-blue-200">
                //             <p>{item?.start_of_contract}</p>
                //             <p>{item?.embarkation}</p>
                //             <p>{item?.embarkation_port}</p>
                //             <p>{item?.vessel?.label}</p>
                // </div>
                //1 
                <div key={index} className="bg-blue-100 max-w-72 rounded-md container mx-auto  py-4  flex flex-col justify-center items-center ">
                    <div className="text-blue-600 text-center ">
                        <h1 className=" font-bold">{item?.vessel?.label ?? "Vessel Name"}</h1>
                        <p className="text-sm">{item?.embarkation_port ?? "Embarkation port"}</p>
                    </div>
                    <p className="font-medium text-blue-600 text-xs">{displayDate(item.start_of_contract)} - {displayDate(item.end_of_contract)}</p>
                    <div className="text-blue-600 text-left w-full">
                        <ul className="px-3 ">
                            <li className="bg-blue-200 text-xs p-2 my-1  "><span className="font-semibold">Embarkation Details</span>
                                <div className=" flex justify-between">
                                    <div> {item.embarkation_port}</div>
                                    <div> {displayDate(item.embarkation)}</div>
                                </div>
                            </li>
                            <li className="bg-blue-200 text-xs p-2 my-1"><span className="font-semibold">Disembarkation Details</span>
                                <div className="flex justify-between">
                                    <li>{item.disembarkation_port}</li>
                                    <li>{displayDate(item.EOC_date)}</li>
                                </div>
                            </li>
                            <li className="text-xs">Sign-off:
                                <span className="font-medium">{displayDate(item.sign_off_request)}</span>
                            </li>
                            <li className="text-xs">
                                <span className="font-medium">{item.sign_off_reason}</span>
                            </li>
                            <li className="text-xs">Next Available From: {displayDate(item.next_available_from)}</li>
                        </ul>
                    </div>
                    <button className="mt-8 bg-white text-blue-700 py-2 px-4 rounded-md font-bold hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Modify Now</button>
                </div>
                // end 1

            ))}
            </div>
            
        </CommonLayout>
        
    </>
}