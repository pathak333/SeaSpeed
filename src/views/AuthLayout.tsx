import { useEffect } from "react";
import { Moon, Sun } from "react-feather";
import { NoPropComponent } from "../types/noProps.type";
import { Outlet } from "react-router-dom";
import { useThemeContext } from "../contexts/theme.context";

const AuthLayout: NoPropComponent = () => {
  const { mode, toggleMode } = useThemeContext();

  useEffect(() => {
    console.log("login view init .....");
  }, []);

  return (
    <div
      className="min-h-screen items-center max-sm:items-start max-sm:pt-11 justify-center flex bg-cover max-sm:bg-contain max-sm:bg-bottom relative"
      style={{
        backgroundImage: "url(/images/login_bg.png)",
        backgroundRepeat: "no-repeat",
        backgroundColor: mode === "dark" ? "#0f172a" : "#E5FFFF",
      }}
    >
      <button
        onClick={toggleMode}
        aria-label="Toggle dark mode"
        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 shadow transition-colors"
      >
        {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="rounded-xl p-4 max-md:p-5 max-lg:p-6 lg:p-8 bg-white dark:bg-gray-800 ml-16 mr-16 text-center items-center flex flex-col">
        <p className="text-3xl max-sm:text-2xl dark:text-gray-100">Hello!</p>
        <p className="text-gray-400 dark:text-gray-400 mt-2">welcome to Speed marine</p>
        <div className="rounded-full bg-white dark:bg-gray-700 items-center max-sm:w-20 max-sm:mb-2 max-sm:mt-2 max-md:w-32 max-lg:w-48 lg:w-48">
          <img src="/images/logo.png" alt="seaSpeed" className="" />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
