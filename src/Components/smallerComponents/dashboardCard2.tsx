import { ChevronRight } from "react-feather";
import { DashboardCard2Props } from "../../types/card.types";

const DashboardCard2 = (props: DashboardCard2Props) => {
  return (
    <div
      className="block w-[260px] max-sm:w-[148px] max-md:w-[160px] p-5 m-2 bg-white dark:bg-gray-800 border-2 rounded-lg shadow-sm border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      onClick={props.onClick}
    >
      <div className="bg-[#eff0f5] dark:bg-gray-700 w-14 h-14 flex items-center justify-center rounded-lg">
        {props.icon}
      </div>
      <h5 className="font-semibold text-base my-2 dark:text-gray-100">
        {props.label}
        <ChevronRight
          color="#0075FF"
          className="mr-3 inline-block float-right"
        />
      </h5>
    </div>
  );
};

export default DashboardCard2;
