import { useEffect, useRef, useState } from "react";
import { Home, Bell, ChevronDown, Menu, Sun, Moon } from "react-feather";
import { useGlobalState } from "../../contexts/global.context";
import { useThemeContext } from "../../contexts/theme.context";
import SideBarMenuItem from "../smallerComponents/sidebarMenuItems";

import { useNavigate } from "react-router-dom";
import { BusinessCenterOutlined, DirectionsBoatRounded } from "@mui/icons-material";



const NavbarComponent = (props: any) => {
  const [globalState, dispatch] = useGlobalState();
  const { mode, toggleMode } = useThemeContext();
  const navigate = useNavigate();
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


  function getDPName(firstname:string, lastname:string) {
    if (lastname.length === 0 ) {
     return firstname[0].toUpperCase()
    }
    return (firstname[0] + lastname[0]).toUpperCase()
 }


  return (
    <>
      <nav className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between p-3 border-b-2 dark:border-gray-700">
          <div className="flex flex-row">
            <div className="w-24 max-sm:w-12 border-r-2 dark:border-gray-700">
              <img
                src="/images/logo.png"
                alt="seaSpeed"
                className="w-12 h-12 mx-auto "
              />
            </div>
            <p className="align-middle my-auto pl-3 not-italic font-medium text-2xl max-sm:text-xs dark:text-gray-100">
              {props.name ?? "Dashboard"}
            </p>
          </div>
          <div className="flex flex-row items-end justify-evenly w-1/3">
            <div className="relative my-auto w-6 h-6 dark:text-gray-200">
              <Bell className="absolute" />
              <div className="bg-blue-600 w-2 h-2 rounded-xl ml-auto"></div>
            </div>
            <button
              onClick={toggleMode}
              aria-label="Toggle dark mode"
              className="my-auto p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative flex flex-row items-center">
              <div className="flex flex-row items-center" id="menu-button" aria-expanded="true" aria-haspopup="true" onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="profileImage flex justify-center items-center rounded-full w-12 h-12 max-sm:hidden bg-slate-400">
                {data && data["avatar"] !== "" ? <img
                    src={`${data["avatar"]}`}
                    alt="seaSpeed"
                    className="w-12 h-12 mx-auto rounded-full"
                  /> : <p className="text-lg text-white font-semibold">
                      {data && getDPName(data["firstname"],data["lastname"])}
                  </p>}
                </div>
                <p className="ml-3 mr-1 text-xl text-activeIconColor font-medium max-sm:hidden ">
                  {data ? `${data["firstname"]} ${data["lastname"]}` : ""}
                </p>
                <ChevronDown color="#0075FF" className="mr-3 " />
              </div>
              {isHovered && <div className="absolute right-0 z-10 mt-12 w-56 origin-bottom-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="py-1" role="none" >
                  <p className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm cursor-pointer" id="pro" role="menuitem" tabIndex={-1}>Profile</p>
                  <p onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                  }} className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm cursor-pointer" id="log" role="menuitem" tabIndex={-1}>LogOut</p>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-start h-[90%] overflow-hidden">
        <div className={`w-[14%] h-full ${!isSidebarOpen ? "max-sm:h-auto max-sm:w-0" : "max-sm:h-full max-sm:w-[43%] max-md:w-[43%] max-lg:w-[18%] max-sm:absolute"} border-r-2 dark:border-gray-700 bg-white dark:bg-gray-900 z-50`}>
          <Menu
            className={`${isSidebarOpen && "max-sm:hidden"} sm:hidden my-2 mx-3 dark:text-gray-200`}
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
          <div
            className={`${!isSidebarOpen && "max-sm:hidden"} h-full`}
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
                navigate('/admindashboard/home')
                setIsSidebarOpen(!isSidebarOpen);
              }}
            />
          {data &&  data['permission'].includes("vessel") &&  <SideBarMenuItem
              icon={
                <DirectionsBoatRounded className="text-activeIconColor" />
              }
              label={"Vessel"}
              onClick={() => {
                navigate('/adminDashboard/viewVessel')
                setIsSidebarOpen(!isSidebarOpen);
              }}
            />}
          {data &&  data['permission'].includes("admin") &&  <SideBarMenuItem
              icon={
                <BusinessCenterOutlined className="text-activeIconColor" />
              }
              label={"Company"}
              onClick={() => {
                navigate('/adminDashboard/viewAllCompany')
                setIsSidebarOpen(!isSidebarOpen);
              }}
            />}
          </div>
        </div>
          <div className="flex-grow w-full h-full py-5 m-3 max-sm:px-4 max-sm:pt-8 overflow-auto">
            {props.children}
          </div>
      </div>
    </>
  );
};
export default NavbarComponent;
