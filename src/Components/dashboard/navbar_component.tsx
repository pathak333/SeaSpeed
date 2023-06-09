import { useEffect, useState } from "react";
import { Home, Bell, ChevronDown, Menu } from "react-feather";
import { useGlobalState } from "../../contexts/global.context";
import SideBarMenuItem from "../smallerComponents/sidebarMenuItems";
import DropDownMenu from "../smallerComponents/dropdownMenu";

const NavbarComponent = (props: any) => {
  const [globalState] = useGlobalState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let data = globalState.data != null ? globalState.data.data : null;
  useEffect(() => {
    console.log("data here = ", data);
  }, [data]);



  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


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
             {props.name ?? "Dashboard"} 
            </p>
          </div>
          <div className=" flex flex-row items-end justify-evenly  w-1/3">
            <div className="relative my-auto  w-6 h-6">
              <Bell className="absolute  " />

              <div className="bg-blue-600 w-2 h-2 rounded-xl   ml-auto"></div>
            </div>
            <div className=" relative  flex flex-row items-center ">
              <div className="flex flex-row items-center" id="menu-button" aria-expanded="true" aria-haspopup="true"  onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
                <div className="profileImage rounded-full w-12 h-12 max-sm:hidden bg-slate-400">
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
            { isHovered && <div className="absolute right-0 z-10 mt-12 w-56 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1} onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
                <div className="py-1" role="none" >
                  <p className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="pro" role="menuitem" tabIndex={-1}>Profile</p>
                  <p className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="log" role="menuitem" tabIndex={-1}>LogOut</p>
                </div>
              </div>}
            </div>  
          </div>
        </div>
      </nav>

      <div className="relative flex flex-row items-start h-full  ">
        <div className={`absolute w-28 h-full ${!isSidebarOpen ? "max-sm:h-full" : "max-sm:h-auto"}  z-50 `}>
          <Menu
            className={`${!isSidebarOpen && "max-sm:hidden"
              } sm:hidden my-2 mx-3`}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
          <div
            className={`${isSidebarOpen && "max-sm:hidden"
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
