import { ChevronRight } from "react-feather";
import { DashboardCardProps } from "../../types/card.types";

const DashboardCard = (props: DashboardCardProps) => {
 var color =  props.iconbg ? props.iconbg!.match(/bg-\[#([a-fA-F0-9]+)\]/)![1] : ""
  return (
    <div
      className={`block w-[220px] max-sm:w-full p-3 m-2 bg-white rounded-lg border-s-2 border-[#${color}] shadow-sm hover:bg-grey-200 hover:scale-105 dark:bg-grey-800   dark:hover:bg-sky-100 hover:border-sky-400  hover:shadow-lg hover:shadow-sky-300/30 cursor-pointer group`} 
      onClick={props.onClick}
    >
      <div className="flex flex-row  align-middle items-center">
      <div className={ ` ${ props.iconbg ? props.iconbg : 'bg-[#E4F0FF]'}   w-12  h-12 flex items-center justify-center rounded-lg  `}>
        {/* <User className="text-IbColor" /> */}
        {props.icon}
        </div>
        
      <h5 className="font-semibold text-sm my-2 ml-2 ">
        {props.label}
        {/* <ChevronRight color="#0075FF" className="mr-3 inline-block" /> */}
      </h5>
      </div>
      <hr className=" bg-blue-200   h-[2px] w-full mt-2 mb-1 line" />
      <p className="text-textGrey text-sm  ">{props.description}</p>
    </div>
  );
};

export default DashboardCard;
