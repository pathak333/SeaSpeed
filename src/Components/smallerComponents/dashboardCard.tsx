import { ChevronRight } from "react-feather";
import { DashboardCardProps } from "../../types/card.types";

const DashboardCard = (props: DashboardCardProps) => {
 var color =  props.iconbg ? props.iconbg!.match(/bg-\[#([a-fA-F0-9]+)\]/)![1] : ""
  return (
    <div
      className={`block w-[260px] max-sm:w-full p-6 m-2 bg-white dark:bg-gray-800 rounded-lg border-s-2 border-[#${color}] shadow-sm hover:scale-105 dark:hover:bg-gray-700 cursor-pointer`}
      onClick={props.onClick}
    >
      <div className={`${props.iconbg ? props.iconbg : "bg-[#E4F0FF] dark:bg-blue-900/30"} w-14 h-14 flex items-center justify-center rounded-lg`}>
        {/* <User className="text-IbColor" /> */}
        {props.icon}
      </div>
      <h5 className="font-semibold text-xl my-2 dark:text-gray-100">
        {props.label}
        <ChevronRight color="#0075FF" className="mr-3 inline-block" />
      </h5>
      <p className="text-textGrey dark:text-gray-400">{props.description}</p>
    </div>
  );
};

export default DashboardCard;
