
import { SideBarMenuItemTypes } from "../../types/sideBarMenuItems.type";

const SideBarMenuItem = ({
  icon,
  label,
  onClick,
}: SideBarMenuItemTypes): JSX.Element => {
  return (
    <div
      className="w-auto px-4 py-3 flex flex-wrap   bg-slate-100 m-2 rounded-lg cursor-pointer "
      onClick={onClick}
    >
     
      
      {icon}
  

      <p className="pl-2 text-black text-sm not-italic font-medium ">
        {label}
      </p>
    </div>
  );
};
export default SideBarMenuItem;
