import { SideBarMenuItemTypes } from "./sideBarMenuItems.type";

export interface DashboardCardProps
  extends Omit<SideBarMenuItemTypes, "label"> {
  description: String;
  label: JSX.Element;
}

export interface DashboardCard2Props extends SideBarMenuItemTypes {}
