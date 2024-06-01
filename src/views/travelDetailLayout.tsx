import { useState } from "react";
import {
  TravelDetailContext,
  TravelDetailContextValue,
  TravelState,
} from "../contexts/travelDetail.context";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { useGlobalState } from "../contexts/global.context";

const TravelDetailLayout = (props: any) => {
  const [state, setState] = useState(TravelState.passport);
  const contextValue: TravelDetailContextValue = { state, setState };
  const navigate = useNavigate();
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

  return (
    <TravelDetailContext.Provider value={contextValue}>
      <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
              <span className="mr-2">
                <ArrowLeft onClick={() => goBack()} />
              </span>{" "}
              Travel details
            </p>
            <p className="pl-8 text-[#A5A5A5]">
              Passport Details, Visa Detail, Seamen Book Detail
            </p>
          </div>
          {id && <p className=" text-[25px] font-bold text-gray-200 leading-none items-start justify-start">{`${globalState?.temp?.data?.firstname} ${globalState?.temp?.data?.lastname} - `}<span className="text-sm">{globalState?.temp?.data?.rank?.label}</span></p>}
        </div>
        <div className=" my-5 ml-4">
          <p className="flex flex-auto max-sm:flex-wrap  items-center">
            <span className={state >= 0 ? "text-blue-500" : ""}>
              Passport <span className="max-sm:hidden">details</span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 1 ? "text-blue-500" : ""}>
              Visa <span className="max-sm:hidden">details</span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 2 ? "text-blue-500" : ""}>
              Seamen <span className="max-sm:hidden">Book</span>
            </span>
          </p>
        </div>
        <Outlet />
        {/* {props.children} */}
      </div>
    </TravelDetailContext.Provider>
  );
};

export default TravelDetailLayout;
