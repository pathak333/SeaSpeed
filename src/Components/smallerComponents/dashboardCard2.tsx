// import { ChevronRight } from "react-feather";
import { DashboardCard2Props } from "../../types/card.types";

const DashboardCard2 = (props: DashboardCard2Props) => {
  return (
    <div
      className="block items-center self-center w-[220px] max-sm:w-full max-md:w-1/2 p-3 m-2 bg-white border-2 rounded-lg shadow-sm hover:bg-grey-200 dark:bg-grey-800 border-gray-300 hover:bg-gray-100 cursor-pointer  "
      onClick={props.onClick}
    >
      <div className="flex flex-row  align-middle items-center">
      <div className={`  w-12 h-12 flex items-center justify-center rounded-lg ${ props.iconbg ? props.iconbg : 'bg-[#E4F0FF]'} `}>
        {props.icon}
      </div>
      <h5 className="font-semibold text-sm my-2 ml-2">
        {props.label}
        {/* <ChevronRight
          color="#0075FF"
          className="mr-3 inline-block float-right"
        /> */}
        </h5>
        </div>
    </div>
  );
};

export default DashboardCard2;
