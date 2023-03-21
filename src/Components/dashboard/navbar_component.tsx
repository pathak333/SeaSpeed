import { useEffect, useState } from "react";
import { Home, Bell, ChevronDown, Menu } from "react-feather";
import { useGlobalState } from "../../contexts/global.context";
import SideBarMenuItem from "../smallerComponents/sidebarMenuItems";

const NavbarComponent = (props: any) => {
  const [globalState] = useGlobalState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let data = globalState.data != null ? globalState.data.data : null;
  useEffect(() => {
    console.log("data here = ", data);
  }, [data]);

  return (
    <>
      <nav className=" bg-white">
        <div className="flex items-center justify-between p-4 border-b-2">
          <div className="flex flex-row">
            <div className="w-24 max-sm:w-12  border-r-2">
              <img
                src="/images/logo.png"
                alt="seaSpeed"
                className="w-12 h-12 mx-auto "
              />
            </div>
            <p className="align-middle my-auto pl-3 not-italic font-medium text-2xl max-sm:text-xs">
              Dashboard
            </p>
          </div>
          <div className=" flex flex-row items-end justify-evenly  w-1/3">
            <div className="relative my-auto  w-6 h-6">
              <Bell className="absolute  " />

              <div className="bg-blue-600 w-2 h-2 rounded-xl   ml-auto"></div>
            </div>
            <div className="flex flex-row items-center ">
              <div className="profileImage rounded-full w-12 h-12 max-sm:w-6 max-sm:h-6 bg-slate-400">
                <img
                  src={`${data ? data["avatar"] : ""}`}
                  alt="seaSpeed"
                  className="w-12 h-12 mx-auto rounded-full"
                />
              </div>
              <p className="ml-3 mr-1 text-xl text-activeIconColor font-medium max-sm:hidden ">
                {data ? `${data["firstname"]} ${data["lastname"]}` : ""}
              </p>
              <ChevronDown color="#0075FF" className="mr-3 " />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative flex flex-row items-start h-full  ">
        <div className="absolute w-28 h-full  z-50 ">
          <Menu
            className={`${
              !isSidebarOpen && "max-sm:hidden"
            } sm:hidden my-2 mx-3`}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
          <div
            className={`${
              isSidebarOpen && "max-sm:hidden"
            } border-r-2 bg-white h-full `}
          >
            <SideBarMenuItem
              icon={
                <Home
                  color="#0075FF"
                  size={18}
                  className="items-center justify-center"
                />
              }
              label={"Home"}
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
            />
          </div>
        </div>
        <div className="absolute w-full mt-10 px-6 max-sm:px-4 sm:pl-32">
          {props.children}
        </div>
      </div>
    </>
  );
};
export default NavbarComponent;
