import { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  PersonalDetailContext,
  PersonalDetailContextValue,
  Personalstate,
} from "../contexts/personalDetail.context";
import { useGlobalState } from "../contexts/global.context";

// interface Props {
//   children: JSX.Element;
// }

const PersonalDetailLayout = (props: any) => {
  const navigate = useNavigate();
  const [state, setState] = useState(Personalstate.personalDetails);
  const contextValue: PersonalDetailContextValue = { state, setState };
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
    <PersonalDetailContext.Provider value={contextValue}>
      <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
              <span className="mr-2">
                <ArrowLeft onClick={() => goBack()} />
              </span>{" "}
              Personal details
            </p>
            <p className="pl-8 text-[#A5A5A5]">
              Contact Details, Education background, Bank details, kin details,
            </p>
          </div>
          {id && <p className=" text-[25px] font-bold text-gray-200 leading-none items-start justify-start">{`${globalState?.temp?.data?.firstname} ${globalState?.temp?.data?.lastname} - `}<span className="text-sm">{globalState?.temp?.data?.rank?.label}</span></p>}
        </div>
        <div className=" my-5 ml-4">
          <p className="flex flex-auto max-sm:flex-wrap  items-center">
            <span className={state >= 0 ? "text-blue-500" : ""}>
              Personal <span className="max-sm:hidden">details</span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 1 ? "text-blue-500" : ""}>
              Contact <span className="max-sm:hidden">details</span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 2 ? "text-blue-500" : ""}>
              Education <span className="max-sm:hidden">background</span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 3 ? "text-blue-500" : ""}>
              Bank <span className="max-sm:hidden">details</span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 4 ? "text-blue-500" : ""}>
              Kin <span className="max-sm:hidden">details</span>
            </span>
          </p>
        </div>
        <Outlet />
        {/* {props.children} */}
      </div>
    </PersonalDetailContext.Provider>
  );
};
export default PersonalDetailLayout;
