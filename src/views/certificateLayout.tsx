import { useState } from "react";
import { ArrowLeft } from "react-feather";
import { Outlet, useNavigate } from "react-router-dom";
import { TravelState } from "../contexts/travelDetail.context";
import { CertificateContext, CertificateContextValue, CertificateState } from "../contexts/certificate.context";
import { useGlobalState } from "../contexts/global.context";





const CertificateLayout = () => {
    const navigate = useNavigate()
    const [state, setState] = useState(CertificateState.competency);
    const contextValue: CertificateContextValue = { state, setState };
    const [globalState,] = useGlobalState()


      function goBack() {
        if (globalState.data.data.role === "admin") {
      navigate(-1)
    } else {
    navigate("/dashboard/home", { replace: true });
    }
  }

    return <CertificateContext.Provider value={contextValue}>
          <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
        <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
          <span className="mr-2">
            <ArrowLeft onClick={() => goBack()} />
          </span>{" "}
          Certificates
        </p>
        <p className="pl-8 text-[#A5A5A5]">
        Certificate of competency, Flag endorsement, Dangerous cargo endorsement
        </p>
        <div className=" my-5 ml-4">
          <p className="flex flex-auto max-sm:flex-wrap  items-center">
            <span className={state >= 0 ? "text-blue-500" : ""}>
            Certificate of competency <span className="max-sm:hidden"></span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 1 ? "text-blue-500" : ""}>
            Flag endorsement <span className="max-sm:hidden"></span>
            </span>

            <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
            <span className={state >= 2 ? "text-blue-500" : ""}>
            Dangerous cargo endorsement <span className="max-sm:hidden"></span>
            </span>
          </p>
        </div>
        <Outlet />
        {/* {props.children} */}
      </div>
    </CertificateContext.Provider>
}
export default CertificateLayout;