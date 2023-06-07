import { ChevronRight } from "react-feather";
import { DashboardCardProps } from "../../types/card.types";

const DashboardCard = (props: DashboardCardProps) => {
  return (
    <div
      className="block w-[260px] max-sm:w-full p-6 m-2 bg-white rounded-lg shadow-sm hover:bg-grey-200 dark:bg-grey-800 dark:border-gray-700 dark:hover:bg-gray-100 cursor-pointer"
      onClick={props.onClick}
    >
      <div className={ ` ${ props.iconbg ? props.iconbg : 'bg-[#E4F0FF]'}   w-14 h-14 flex items-center justify-center rounded-lg  `}>
        {/* <User className="text-IbColor" /> */}
        {props.icon}
      </div>
      <h5 className="font-semibold text-xl my-2">
        {props.label}
        <ChevronRight color="#0075FF" className="mr-3 inline-block" />
      </h5>
      <p className="text-textGrey ">{props.description}</p>
    </div>
  );
};

export default DashboardCard;
