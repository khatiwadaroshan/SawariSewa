import Login from "./pages/Login";
import Register from "./pages/Register";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./components/components_lite/Home";
import Layout from "./pages/Layout";

import TermsofServices from "./pages/TermsofServices";
import Contact from "./pages/Contact";
import Stores from "./pages/Stores";
import Individual from "./pages/individual";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/Contactus";
import Aboutus from "./pages/Aboutus";
import { Toaster } from "sonner";
import { Header } from "./pages/Header";
import Booking from "./pages/Booking";
import RegisterRentee from "./pages/RegisterRentee";
import RegisterVehicle from "./pages/RegisterVehcile";

import VerifyEmail from "./pages/VerifyEmail";
import { ProtectedRoute, ToHomePage } from "./lib/ProtectedRoute";
import { useAuthStore } from "./Store/useAuthStore";
import { useEffect } from "react";
import { IsRentee } from "./lib/renteeReg";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";


import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Vehicles from "./pages/admin/Vehicles";

import AdminLogin from "./pages/admin/AdminLogin";
import Payments from "./pages/admin/Payments";
import MyBookings from "./pages/MyBookings";
import { ProtectedAdminRoute } from "./lib/adminprotectedroutes";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <ToHomePage>
            <Login />
          </ToHomePage>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "stores",
        element: <Stores />,
      },
      {
        path: "individual",
        element: <Individual />,
      },
      {
        path: "termsofservices",
        element: <TermsofServices />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "aboutus",
        element: <Aboutus />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "header",
        element: <Header />,
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "registerrentee",
        element: (
          <IsRentee>
            <RegisterRentee />
          </IsRentee>
        ),
      },
      {
        path: "registervehicle",
        element: <RegisterVehicle />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "logout",
        element: <Logout />,
      },
      
      {
        path:"payment",
        element:<Payment/>
      },
      {
        path:"paymentsuccess",
        element:<PaymentSuccess />
      },
      {
        path:"paymentfailure",
        element:<PaymentFailure/>
      },
      {
        path: "mybookings",
        element: (
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        ),
        
      },
    ],
  },
  // Admin routes - separate from main layout
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    children: [
      { path: "users", element: <Users /> },
      { path: "vehicles", element: <Vehicles /> },
      
      { path: "payments", element: <Payments /> },
    ],
  },
]);

function App() {
  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    console.log(authUser);
  }, [authUser]);

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
