import { useEffect, useRef, useState } from "react";
import { Home, Bell, ChevronDown, Menu, ChevronRight } from "react-feather";
import { useGlobalState } from "../../contexts/global.context";
import SideBarMenuItem from "../smallerComponents/sidebarMenuItems";

import { useNavigate } from "react-router-dom";
import { AddHome, ArrowDropDown, BusinessCenterOutlined, Close, Domain, HomeMax, HomeMaxOutlined, People, Sailing } from "@mui/icons-material";
import Notification from "./notification_list";
// import Lottie from "lottie-react";
// import i from "../../assets/system-solid-161-trending-flat.json"



const NavbarComponent = (props: any) => {
  const [globalState, dispatch] = useGlobalState();
  const navigate = useNavigate();
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  let data = globalState.data != null ? globalState.data.data : null;
  console.log("final=", data);


  const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarMenu = document.querySelector('.sidebar-menu');
  const main = document.querySelector('.main');
  const group = document.querySelectorAll('.group');
console.log(group)

  function toggleFullscreen() {
    if (document.fullscreenElement) {
        // If already in fullscreen, exit fullscreen
        document.exitFullscreen();
    } else {
        // If not in fullscreen, request fullscreen
        document.documentElement.requestFullscreen();
    }
  }
  
  useEffect(() => {
    if (screenWidth < 500) {
      main?.classList.remove('active');
      main?.classList.remove('md:ml-64')
      main?.classList.remove('md:w-[calc(100%-256px)]')
      sidebarOverlay?.classList.remove('hidden');
      sidebarMenu?.classList.add('-translate-x-full');
  }
    
    const handleSidebarDropdownToggle = (item: any) => (e: any) => {
      e.preventDefault();
      const parent = item.closest('.group');
      if (parent.classList.contains('selected')) {
        parent.classList.remove('selected');
      } else {
        document.querySelectorAll('.sidebar-dropdown-toggle').forEach((i) => {
          i?.closest('.group')?.classList.remove('selected');
        });
        parent.classList.add('selected');
      }
    };

  
  

  
    // sidebarToggle?.addEventListener('click', handleSidebarToggle);
    // sidebarOverlay?.addEventListener('click', handleSidebarOverlayClick);

    document.querySelectorAll('.sidebar-dropdown-toggle').forEach((item) => {
      item.addEventListener('click', handleSidebarDropdownToggle(item));
    });

    // Clean up event listeners on component unmount
    return () => {
      // sidebarToggle?.removeEventListener('click', handleSidebarToggle);
      // sidebarOverlay?.removeEventListener('click', handleSidebarOverlayClick);


      document.querySelectorAll('.sidebar-dropdown-toggle').forEach((item) => {
        item.removeEventListener('click', handleSidebarDropdownToggle(item));
      });
    };
  }, []);


  const clickHandleronGroup = (e: any) => {
    e.preventDefault();
    group.forEach((ee: any) => {
      if (ee.classList.contains('selected')) {
        ee.classList.remove('selected');
      }
    })
    e?.currentTarget.classList.add('selected')
  }

  //role.toLocaleLowerCase() === "admin"
  useEffect(() => {
    console.log("data here = ", data);
  }, [data]);

  useEffect(() => {
    handleSidebarToggle(null,isSidebarOpen)
  }, [isSidebarOpen]);


 

  const handleSidebarToggle = (e: any,v:boolean) => {
    e?.preventDefault();
    if (isSidebarOpen === false) {
      main?.classList.add('active');
      main?.classList.add('md:w-[calc(100%-256px)]');
      main?.classList.add('md:ml-64');
      sidebarOverlay?.classList.add('hidden');
      sidebarMenu?.classList.remove('-translate-x-full');
    } else {
      main?.classList.remove('active');
      main?.classList.remove('md:ml-64')
      main?.classList.remove('md:w-[calc(100%-256px)]')
      sidebarOverlay?.classList.remove('hidden');
      sidebarMenu?.classList.add('-translate-x-full');
    }
  
  };

  const handleSidebarOverlayClick = (e: any,v:boolean) => {
    e.preventDefault();
    // setIsSidebarOpen(v)
    main?.classList.add('active');
    // if (!isSidebarOpen) {
    //   main?.classList.toggle('md:w-[calc(100%-256px)]');
    //   main?.classList.toggle('md:ml-64');
    // }
    sidebarOverlay?.classList.add('hidden');
    sidebarMenu?.classList.add('-translate-x-full');
  };



  const [isHovered, setIsHovered] = useState(false);
  const [isNotifyHovered, setIsNotifyHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleNotifyMouseEnter = () => {
    setIsNotifyHovered(true);
  };

  const handleNotifyMouseLeave = () => {
    setIsNotifyHovered(false);
  };


  function getDPName(firstname: string, lastname: string) {
    if (lastname.length === 0) {
      return firstname[0].toUpperCase()
    }
    return (firstname[0] + lastname[0]).toUpperCase()
  }


  return (
    <>
      {/* <!--sidenav --> */}
      <div className={`fixed left-0 top-0 w-64 h-full bg-blue-50  shadow-md  p-4 z-50 sidebar-menu transition-transform ${screenWidth < 500 ? '-translate-x-full' : ""}`} onMouseLeave={(e:any)=>{if(screenWidth < 500)setIsSidebarOpen(!isSidebarOpen)}}>
        <div className="flex items-center justify-between pb-4 border-b border-b-gray-800">

          <h2 className="font-bold text-2xl">SEA <span className="bg-[#2C77CF] text-white px-2 rounded-md">SPEED</span></h2>
        </div>
    { data && data["role"] !== "user" &&  <ul className="mt-4" >
          {/* <span className="text-gray-400 font-bold">ADMIN</span> */}
          <li className="mb-1 group selected" onClick={(e:any)=>clickHandleronGroup(e)}>
            <div className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-slate-300 hover:text-gray-900 rounded-md group-[.active]:bg-slate-300 group-[.active]:text-gray-900 group-[.selected]:bg-slate-300 group-[.selected]:text-gray-900"
            onClick={()=>navigate('/admindashboard/home')}>
              <Home className=' mr-3 text-lg' />
              <span className="text-sm">Dashboard</span>
            </div>
          </li>
          <li className="mb-1 group" onClick={(e:any)=>clickHandleronGroup(e)}>
            <div className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-slate-300 hover:text-gray-900 rounded-md group-[.active]:bg-slate-300 group-[.active]:text-gray-900 group-[.selected]:bg-slate-300 group-[.selected]:text-gray-900 sidebar-dropdown-toggle">
              <People className='bx bx-user mr-3 text-lg'/>
              <span className="text-sm">Crew</span>
              <ChevronRight className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
            </div>
            <ul className="pl-7 mt-2 hidden group-[.selected]:block">
              <li className="mb-4">
                <div  className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3" onClick={()=>navigate("/adminDashboard/viewAllAdmin")}>All Admin</div>
              </li>
              <li className="mb-4">
                <div className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3" onClick={()=>navigate("/adminDashboard/allCrewMember")}>All Crew</div>
              </li>
              <li className="mb-4">
                <div className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3" onClick={()=>navigate("/adminDashboard/allPendinCrewMember")}>All Pending Crew</div>
              </li>
            </ul>
          </li>
          {data && data['permission'].includes("vessel") && <li className="mb-1 group" onClick={(e:any)=>clickHandleronGroup(e)}>
            <div className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-slate-300 hover:text-gray-900 rounded-md group-[.active]:bg-slate-300 group-[.active]:text-gray-900 group-[.selected]:bg-slate-300 group-[.selected]:text-gray-900"
              onClick={() => {
                navigate('/adminDashboard/viewVessel')
                // setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <Sailing className='bx bx-user mr-3 text-lg' /> 
              <span className="text-sm">Vessel</span>
            </div>
          </li>}
          {data && data['permission'].includes("admin") && <li className="mb-1 group" onClick={(e:any)=>clickHandleronGroup(e)}>
            <div className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-slate-300 hover:text-gray-900 rounded-md group-[.active]:bg-slate-300 group-[.active]:text-gray-900 group-[.selected]:bg-slate-300 group-[.selected]:text-gray-900"
              onClick={() => {
                navigate('/adminDashboard/viewAllCompany')
                // setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <Domain className='bx bx-user mr-3 text-lg' /> 
              <span className="text-sm">Company</span>
            </div>
          </li>}

        </ul>}

         {data && data["role"] !== 'admin' && <ul className="mt-4">
        
        </ul>}
      </div>
      {!isSidebarOpen && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" onClick={(e:any)=>setIsSidebarOpen(!isSidebarOpen)}></div>}
      {/* <!-- end sidenav --> */}
      <main className=" w-full h-full  md:w-[calc(100%-256px)] md:ml-64  bg-zinc-200  bg-opacity-100 min-h-screen transition-all main  overflow-hidden" style={{ backgroundImage: `url('/images/pattern1.jpg')`}}>
        {/* <!-- navbar --> */}
        <div className="py-2 px-6 bg-blue-50 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button type="button" className="text-lg text-gray-900 font-semibold sidebar-toggle" onClick={(e:any)=>setIsSidebarOpen(!isSidebarOpen)}>
            <Menu />
          </button>

          <ul className="ml-auto flex items-center">
            {/* <li className="mr-1 dropdown">
                    <button type="button" className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="hover:bg-gray-100 rounded-full" viewBox="0 0 24 24" ><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg>                    
                    </button>
                    <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                        <form action="" className="p-4 border-b border-b-gray-100">
                            <div className="relative w-full">
                                <input type="text" className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500" placeholder="Search..." />
                                <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900"></i>
                            </div>
                        </form>
                    </div>
                </li> */}
            <li className="dropdown">
              <button type="button" className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600"
                onMouseEnter={handleNotifyMouseEnter} onMouseLeave={handleNotifyMouseLeave} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="hover:bg-gray-100 rounded-full" viewBox="0 0 24 24" ><path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path></svg>
              </button>
              {isNotifyHovered && <div className="absolute right-0 z-10 mt-3 w-80 h-96 overflow-auto origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1} onMouseEnter={handleNotifyMouseEnter}
                onMouseLeave={handleNotifyMouseLeave}>
                <h2 className="text-xl font-semibold p-4">All Instructions</h2>
                <Notification />
              </div>}
            </li>
            <button id="fullscreen-button" onClick={toggleFullscreen}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="hover:bg-gray-100 rounded-full" viewBox="0 0 24 24" ><path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"></path></svg>
            </button>
            <li className="dropdown ml-3">
              <button type="button" className="dropdown-toggle flex items-center">
                <div className="flex-shrink-0 w-10 h-10 relative">
                  <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                    <img className="w-8 h-8 rounded-full" src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg" alt="" />
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                  </div>
                </div>
                <div className="p-2 md:block text-left">
                  <h2 className="text-sm font-semibold text-gray-800">{data ? `${data["firstname"]} ${data["lastname"]}` : ""}</h2>
                  <p className="text-xs text-gray-500">{data ? `${data["role"]}` : ""}</p>
                </div>
              </button>
              <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                <li>
                  <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Profile</a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Settings</a>
                </li>
                <li>
                  <form method="POST" action="">
                    <div role="menuitem" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                      onClick={() => { }}>
                      Log Out
                    </div>
                  </form>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <!-- end navbar --> */}

        {/* <!-- Content --> */}
        {/* <div className="p-6"> */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {props.children}
          </div> */}
            <div className=" flex-grow   h-full pt-3 py-28 m-3  max-sm:px-4 max-sm:pt-8  overflow-auto">
            {props.children}
          </div>
        {/* </div> */}

      </main>
    </>
  );
};
export default NavbarComponent;
