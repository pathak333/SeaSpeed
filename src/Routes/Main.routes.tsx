import { Navigate, BrowserRouter, useRoutes } from "react-router-dom";

import LoginForm from "../Components/auth/loginForm";
import ResetPassword from "../Components/auth/resetPassword";
import UnAuthenticatedRoute from "../Components/auth/unAuthenticatedRoute.component";
import Loader from "../Components/loader";
import { useGlobalState } from "../contexts/global.context";
import AuthLayout from "../views/AuthLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetProfilePic from "../Components/profile/setProfilePic";
import Dashboard from "../Components/dashboard/dashboard";
import AuthenticatedRoute from "../Components/auth/AuthenticatedRoute.component";
import { useEffect, useState } from "react";

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
import { DATA, LOADING, LOGIN } from "../constants/action.constant";
import CreateSubAdmin from "../Components/admin/sub_admin.tsx/create_sub_admin";
import AddCompany from "../Components/admin/company/add_company";
import AddVessel from "../Components/admin/company/vessel/add_vessel";
import CompanyLayout from "../views/AdminViews/companyLayout";
import axios from "axios";
import AllCrewMembers from "../Components/admin/crew_member.tsx/all_crew_member";
import ViewAllAdmin from "../Components/admin/sub_admin.tsx/view_all_admin";
import ViewAllVessel from "../Components/admin/company/vessel/view_all_vessel";
import ViewAllCompany from "../Components/admin/company/view_all_company";
import CrewProfile from "../Components/admin/crew_member.tsx/crew_member_profile";
import AllPendingCrewMembers from "../Components/admin/crew_member.tsx/all_pending_crew_member";
import VesselProfile from "../Components/admin/company/vessel/vessel_profile";
import CompanyProfile from "../Components/admin/company/company_profile";
import { ProfileService, getUserInstruction, updateInstructionUser } from "../services/user.service";
import ExpireDocLayout from "../views/AdminViews/expireDocumentsLayout";
import VesselExpireDocs from "../Components/admin/Expire_documents/vessel_expire_docs";
import CompanyExpireDocs from "../Components/admin/Expire_documents/company_expire_docs";
import { adminProfileService } from "../services/admin.service";
import UserExpireDocs from "../Components/admin/Expire_documents/user_expire_docs";


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
      element: <DashboardLayout key={'DashboardLayout'} />,
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
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CertificateLayout />}
            />

          ),
          children: [
            {
              path: "",
              element: <CertificateOfCompetency />
            },
            {
              path: "flagEndorsement",
              element: <FlagEndorsement />
            },
            {
              path: "dangerousCargo",
              element: <DangerousCargoEndorsement />
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
              element: <WorkExperiance />
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
              element: <CourseCertificate />
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
              element: <MedicalDetails />
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
              element: <UnionRegistrationDetail />
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
              element: <References />
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
            outlet={<AdminDashboard />}
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
          path: "allCrewMember",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<AllCrewMembers />}
            // Error Showing 
            />
          ),
        },
        {
          path: "allPendinCrewMember",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<AllPendingCrewMembers />}
            // Error Showing 
            />
          ),
        },
        {
          path: "crewProfile",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CrewProfile />}
            // Error Showing 
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
          path: "viewAllAdmin",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<ViewAllAdmin />}
            />
          ),

        },
        {
          path: "addCompany",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CompanyLayout />}
            />
          ),
          children: [
            {
              path: "",
              element: <AddCompany />
            }
          ]

        },
        {
          path: "viewAllCompany",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<ViewAllCompany />}
            />
          ),

        },

        {
          path: "companyProfile",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CompanyProfile />}
            />
          ),

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
        {
          path: "vesselProfile",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<VesselProfile />}
            />
          ),

        },
        {
          path: "viewVessel",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<ViewAllVessel />}
            />
          ),

        },
        {
          path: "viewAllExpireDoc",
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<ExpireDocLayout />}
            />
          ),
          children: [
            {
              path: "",
              element: <VesselExpireDocs />
            },
            {
              path: "companyDocs",
              element: <CompanyExpireDocs />
            },
            {
              path: "userExpireDocs",
              element: <UserExpireDocs />
            },
          ]
        },
        // crew file editing section 
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
          element: (
            <AuthenticatedRoute
              accessToken={globalState.accessToken}
              // outlet={<PersonalDetail />}
              outlet={<CertificateLayout />}
            />

          ),
          children: [
            {
              path: "",
              element: <CertificateOfCompetency />
            },
            {
              path: "flagEndorsement",
              element: <FlagEndorsement />
            },
            {
              path: "dangerousCargo",
              element: <DangerousCargoEndorsement />
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
              element: <WorkExperiance />
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
              element: <CourseCertificate />
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
              element: <MedicalDetails />
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
              element: <UnionRegistrationDetail />
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
              element: <References />
            },
          ]
        },

      ]
    },


  ]);

  var role = sessionStorage.getItem("role") ?? "user";

  return role.toLocaleLowerCase() === "admin" || role.toLocaleLowerCase() === "superadmin" ? AdminRoutes : routes;
};
const AppWrapper = () => {
  const [globalState, dispatch] = useGlobalState();
  const [allNotification, updateNotif] = useState([])

  console.log("App Wrapper");

  axios.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token") || "";

  var role = sessionStorage.getItem("role") ?? "user";



  async function fetchdataAdmin() {
    dispatch({ type: LOADING, payload: true });
    const { data } = await adminProfileService();
    console.log("profile data", data);
    sessionStorage.setItem("formState", data.data.formState)
    dispatch({ type: DATA, payload: data });
    dispatch({ type: LOADING, payload: false });
  }

  async function fetchdata() {
    dispatch({ type: LOADING, payload: true });

    const { data } = await ProfileService();
    console.log("profile data", data);
    sessionStorage.setItem("formState", data.data.formState)
    dispatch({ type: DATA, payload: data });
  }
  async function FetchInstruction() {
    const { data } = await getUserInstruction();
    console.log(data);
    updateNotif(data.data)

  }

  async function fetchAll() {
    try {
      role.toLocaleLowerCase() === "admin" || role.toLocaleLowerCase() === "superadmin" ? await fetchdataAdmin() : await fetchdata()
      await FetchInstruction();
      console.log(allNotification, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");


      // Access the updated value of allNotification after the FetchInstruction call


      dispatch({ type: LOADING, payload: false });
    } catch (error) {
      console.error('Error in fetchAll:', error);
      // Handle error as needed
      dispatch({ type: LOADING, payload: false });
    }
  }



  allNotification.forEach((e) => {
    // console.log('Toast Created!?????????????????????????????', allNotification);

    if (e['isSeen'] === false) {
      toast.info(e['message'], {
        toastId: e["_id"],
        autoClose: false,
        onClose: async () => {
          const { data } = await updateInstructionUser({ isSeen: true }, e["_id"]);
          console.log('Toast closed!', data);
          // Your custom function to run on close
          // Add your additional logic here
        },
      });
    }
  })



  useEffect(() => {
    console.log("??????????????????????????????Main routes component??????????????????????????????????????????????");

    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch({ type: LOGIN, payload: token });

    }
  },[]);

  useEffect(() => {
    console.log("??????????????????????????????Main routes component asscess token ??????????????????????????????????????????????");
    fetchAll()
  }, [globalState.accessToken])


  //dispatch, globalState.accessToken
  console.log("MainRoutes")
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
