import { Navigate, BrowserRouter, useRoutes } from "react-router-dom";

import LoginForm from "../Components/auth/loginForm";
import ResetPassword from "../Components/auth/resetPassword";
import UnAuthenticatedRoute from "../Components/auth/unAuthenticatedRoute.component";
import Loader from "../Components/loader";
import { useGlobalState } from "../contexts/global.context";
import AuthLayout from "../views/AuthLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetProfilePic from "../Components/profile/setProfilePic";
import Dashboard from "../Components/dashboard/dashboard";
import AuthenticatedRoute from "../Components/auth/AuthenticatedRoute.component";
import { useEffect } from "react";
import { LOGIN } from "../constants/action.constant";
import DashboardLayout from "../views/dashboardLayout";
import PersonalDetail from "../Components/personalDetails/personalDetail";
import PersonalDetailLayout from "../views/personalDetailLayout";
import ContactDetail from "../Components/personalDetails/contactDetail";
import Education from "../Components/personalDetails/education";
import BankDetail from "../Components/personalDetails/bankDetail";
import KinDetail from "../Components/personalDetails/kinDetail";
const MainRoutes = () => {
  const [globalState] = useGlobalState();

  let routes = useRoutes([
    {
      path: "/*",
      element: globalState.accessToken ? (
        <Navigate to="/dashboard/home" />
      ) : (
        <Navigate to="/auth/login" />
      ),
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: (
            <UnAuthenticatedRoute
              accessToken={globalState.accessToken}
              outlet={<LoginForm />}
            />
          ),
        },
        {
          path: "resetPassword",
          element: (
            <UnAuthenticatedRoute
              accessToken={globalState.accessToken}
              outlet={<ResetPassword />}
            />
          ),
        },
      ],
    },
    {
      path: "/profile",
      element: <AuthLayout />,
      children: [
        {
          path: "profilePic",
          element: (
            <UnAuthenticatedRoute
              accessToken={globalState.accessToken}
              outlet={<SetProfilePic />}
            />
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        // {
        //   path: "",
        //   element: (
        //     <AuthenticatedRoute
        //       accessToken={globalState.accessToken}
        //       outlet={<Dashboard />}
        //     />
        //   ),
        // },
        {
          path: "home",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              outlet={<Dashboard />}
            />
          ),
        },
        {
          path: "personaldetails",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<PersonalDetailLayout />}
            />
          ),
          children: [
            {
              path: "",
              element: <PersonalDetail />,
            },
            {
              path: "contactDetail",
              element: <ContactDetail />,
            },
            {
              path: "educationDetail",
              element: <Education />,
            },
            {
              path: "bankDetail",
              element: <BankDetail />,
            },
            {
              path: "kinDetail",
              element: <KinDetail />,
            },
          ],
        },
      ],
    },
  ]);
  return routes;
};
const AppWrapper = () => {
  const [globalState, dispatch] = useGlobalState();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch({ type: LOGIN, payload: token });
    }
  }, [dispatch, globalState.accessToken]);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {globalState.loading && <Loader />}
      <MainRoutes />
    </BrowserRouter>
  );
};

export default AppWrapper;
