import { ArrowLeft } from "react-feather";
import { Outlet, useNavigate } from "react-router-dom";

// interface Props {
//   children: JSX.Element;
// }

const PersonalDetailLayout = (props:any) => {
  const navigate = useNavigate();

  function goBack() {
    navigate("/dashboard/home", { replace: true });
  }

  return (
    <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
      <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
        <span className="mr-2">
          <ArrowLeft onClick={() => goBack()} />
        </span>{" "}
        Personal details
      </p>
      <p className="pl-8 text-[#A5A5A5]">
        Contact Details, Education background, Bank details, kin details,
      </p>
      <div className=" my-5 ml-4">
        <p className="flex flex-auto max-sm:flex-wrap  items-center">
          <span className="">
            Personal <span className="max-sm:hidden">details</span>
          </span>
          <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
          <span className="">
            Contact <span className="max-sm:hidden">details</span>
          </span>
          <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
          <span className="">
            Education <span className="max-sm:hidden">background</span>
          </span>
          <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
          <span className="">
            Bank <span className="max-sm:hidden">details</span>
          </span>
          <span className="ml-2 mr-2 flex-grow border-t border-gray-400" />
          <span className="">
            Kin <span className="max-sm:hidden">details</span>
          </span>
        </p>
      </div>
      <Outlet />
      {/* {props.children} */}
    </div>
  );
};
export default PersonalDetailLayout;
