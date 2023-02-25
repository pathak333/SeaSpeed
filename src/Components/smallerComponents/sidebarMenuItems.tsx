import { Home } from "react-feather";
import { SideBarMenuItemTypes } from "../../types/sideBarMenuItems.type";

const SideBarMenuItem = ({
  icon,
  label,
  onClick,
}: SideBarMenuItemTypes): JSX.Element => {
  return (
    <div
      className="w-auto p-4 flex flex-col items-center justify-center bg-white border-b-2"
      onClick={onClick}
    >
      <>{icon}</>

      <p className="text-activeIconColor text-base not-italic font-medium">
        {label}
      </p>
    </div>
  );
};
export default SideBarMenuItem;
