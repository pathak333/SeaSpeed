import { useLayoutEffect, useState } from "react"
import { getAllContract } from "../../../services/admin.service"
import { useGlobalState } from "../../../contexts/global.context";
import { LOADING } from "../../../constants/action.constant";
import CommonLayout from "../../../views/AdminViews/commonLayout";
import { displayDate } from "../../../constants/commonFunction";
import CreateContract from "./create_new_contract";

export default function AllContractAdmin() {
    const [globalState, dispatch] = useGlobalState();
    const [isContractboxOpen, updateisContractboxOpen] = useState({isOpen:false,contract:""})
    const [contractData, updatcontractData] = useState<any>([])

    async function fetchData() {
        dispatch({ type: LOADING, payload: true });
        let {data} = await getAllContract()
        console.log(data.data);
        
        if (data) {
            updatcontractData(data.data)
        }
        dispatch({ type: LOADING, payload: false });
    }


    useLayoutEffect(() => {
        fetchData();
    
    //   return () => {
    //     second
    //   };
    }, [])

    console.log(contractData)

    return <>
    
        <CommonLayout heading={"View All Contract"} gobackone subHeading={"Active Contract is display in green and rest is in blue"}>
        <div className="grid m-3 grid-cols-3 gap-y-3">
                   <CreateContract contractData={{contract:isContractboxOpen.contract}}  isOpen={isContractboxOpen.isOpen} onClose={() => updateisContractboxOpen({isOpen:false,contract:""})} label={"Update Contract"} />
                {contractData.length > 0  && contractData.map((item: any, index: any) => (
                
                //         <div key={index} className="max-w-72 bg-blue-200">
                //             <p>{item?.start_of_contract}</p>
                //             <p>{item?.embarkation}</p>
                //             <p>{item?.embarkation_port}</p>
                //             <p>{item?.vessel?.label}</p>
                // </div>
                    //1 
                <div key={index} className={`${item.status ==='PENDING'? 'bg-slate-300' : item.status === 'PLANNED' ? 'bg-green-100' : item.status === 'SIGNON' ? 'bg-blue-200' : 'bg-blue-100'}   max-w-72 rounded-md container mx-auto  py-4  flex flex-col justify-center items-center `}>
                    <div className="text-blue-600 text-center ">
                            <h1 className=" font-bold">{item?.vessel?.label ?? "Vessel Name"}</h1>
                            <div className="flex justify-between bg-blue-400 items-center px-2 my-1 rounded-full"> 
                                <p className="text-[10px] text-white font-bold ">{item.created_for.firstname} { item.created_for.lastname}</p>&nbsp;
                                <p className="text-[10px] text-white font-bold">{ item.rank?.label}</p>
                            </div>
                        {/* <p className="text-sm">{item?.embarkation_port ? item?.embarkation_port : "Embarkation port"}</p> */}
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
                            <li className="text-xs">Sign-off: &nbsp;
                                <span className="font-medium"><b>{displayDate(item.sign_off_request)}</b></span>
                            </li>
                            <li className="text-xs">
                                <span className="font-medium">{item.sign_off_reason}</span>
                            </li>
                            <li className="text-xs">Next Available From: <b>{displayDate(item.next_available_from)}</b></li>
                            <li className="text-xs">Status: <b>{item.status}</b></li>
                        </ul>
                    </div>
                            {item.status !=='SIGNOFF' && item.status !=='CANCEL' && <button className="mt-8 bg-white text-blue-700 py-2 px-4 rounded-md font-bold hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => updateisContractboxOpen({isOpen:true,contract:item._id})}
                            >Modify Now</button>}
                </div>
                // end 1

            ))}
            </div>
        </CommonLayout>
    </>
}