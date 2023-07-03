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

import DashboardLayout from "../views/dashboardLayout";
import PersonalDetail from "../Components/personalDetails/personalDetail";
import PersonalDetailLayout from "../views/personalDetailLayout";
import ContactDetail from "../Components/personalDetails/contactDetail";
import Education from "../Components/personalDetails/education";
import BankDetail from "../Components/personalDetails/bankDetail";
import KinDetail from "../Components/personalDetails/kinDetail";
import TravelDetailLayout from "../views/travelDetailLayout";
import PassPortDetail from "../Components/travelDetails/passportDetails";
import VisaDetail from "../Components/travelDetails/visaDetails";
import SeaMenBookDetail from "../Components/travelDetails/seaMenBookDetails";
import CertificateLayout from "../views/certificateLayout";
import CertificateOfCompetency from "../Components/certification/CertificateOfCompetency";
import DangerousCargoEndorsement from "../Components/certification/DangerousCargoEndorsement";
import FlagEndorsement from "../Components/certification/FlagEndorsement";
import WorkExperianceLayout from "../views/workExperianceLayout";
import WorkExperiance from "../Components/WorkExperiance/workExperiance";
import CourseCertificateLayout from "../views/course&CertificateLayout";
import CourseCertificate from "../Components/course&certificate/Course&Certificate";
import MedicalDetailsLayout from "../views/medicalDetailsLayout";
import MedicalDetails from "../Components/MedicalDetails/MedicalDetails";
import UnionRegistrationLayout from "../views/unionRegistrationLayout";
import UnionRegistrationDetail from "../Components/unionRegistration/unionRegistration";
import References from "../Components/references/References";
import ReferencesLayout from "../views/referencesLayout";
import AdminDashboardLayout from "../views/AdminViews/adminDashboardLayout";
import AdminDashboard from "../Components/admin/dashboard/admin_dashboard";
import CreateCrewMember from "../Components/admin/crew_member.tsx/create_crew_member";
import { LOGIN } from "../constants/action.constant";
import CreateSubAdmin from "../Components/admin/sub_admin.tsx/create_sub_admin";
import AddCompany from "../Components/admin/company/add_company";
import AddManager from "../Components/admin/company/add_manager";
import AddVessel from "../Components/admin/company/add_vessel";
import CompanyLayout from "../views/AdminViews/companyLayout";
import axios from "axios";
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
        {
          path: "traveldetails",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<TravelDetailLayout />}
            />
          ),
          children: [
            {
              path: "",
              element: <PassPortDetail />,
            },
            {
              path: "visadetail",
              element: <VisaDetail />,
            },
            {
              path: "SeaMenBookdetail",
              element: <SeaMenBookDetail />,
            },
          ],
        },
        {
          path: "certificates",
          element:(
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CertificateLayout />}
            />

          ),
          children: [
            {
              path: "",
              element:<CertificateOfCompetency />
            },
            {
              path: "flagEndorsement",
              element:<FlagEndorsement />
            },
            {
              path: "dangerousCargo",
              element:<DangerousCargoEndorsement />
            },
          ]
        },
        {
          path: "workExperiance",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<WorkExperianceLayout />}
            />
            ),
          children: [
            {
              path: "",
              element:<WorkExperiance />
            },
            ]
        },
        {
          path: "courseCertificate",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CourseCertificateLayout />}
            />
            ),
          children: [
            {
              path: "",
              element:<CourseCertificate />
            },
            ]
        },
        {
          path: "medicalDetails",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<MedicalDetailsLayout />}
            />
            ),
          children: [
            {
              path: "",
              element:<MedicalDetails />
            },
            ]
        },
        {
          path: "unionRegistrationDetail",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<UnionRegistrationLayout />}
            />
            ),
          children: [
            {
              path: "",
              element:<UnionRegistrationDetail />
            },
            ]
        },
        {
          path: "references",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<ReferencesLayout />}
            />
            ),
          children: [
            {
              path: "",
              element:<References />
            },
            ]
        },
      ],
    },
  ]);


  let AdminRoutes = useRoutes([
    {
      path: "/*",
      element: globalState.accessToken ? (
        <Navigate to="/admindashboard/home" />
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
      path: "/adminDashboard",
      element: <AdminDashboardLayout />,
      children: [
        {
          path: "home",
          element: (<AuthenticatedRoute
          accessToken={globalState.accessToken}
          // outlet={<PersonalDetail />}
          outlet={ <AdminDashboard />}
        />)
        },
        {
          path: "createCrew",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CreateCrewMember />}
            />
            ),
         
        },
        {
          path: "createSubAdmin",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CreateSubAdmin />}
            />
            ),
         
        },
        {
          path: "addCompany",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CompanyLayout /> }
            />
          ),
          children: [
            {
              path: "",
              element:<AddCompany />
            }
          ]
         
        },
        // {
        //   path: "addManager",
        //   element: (
        //     <AuthenticatedRoute
        //       accessToken={globalState.accessToken}
        //       // outlet={<PersonalDetail />}
        //       outlet={<AddManager />}
        //     />
        //     ),
         
        // },
        {
          path: "addVessel",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<AddVessel />}
            />
            ),
         
        },
      ]
    },
   
  ]);

  var role = sessionStorage.getItem("role") ?? "user";

  return role.toLocaleLowerCase() === "user"   ?  routes : AdminRoutes;
};
const AppWrapper = () => {
  const [globalState, dispatch] = useGlobalState();
  
axios.defaults.headers.common["Authorization"] =
sessionStorage.getItem("token") || "";
  useEffect(() => {
   const token =  sessionStorage.getItem("token");
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
