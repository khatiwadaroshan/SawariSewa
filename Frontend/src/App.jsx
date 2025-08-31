import Login from "./pages/Login"
import Register from "./pages/Register"

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Home from "./components/components_lite/Home"
import Layout from "./pages/Layout"

import TermsofServices from "./pages/TermsofServices"
import Contact from "./pages/Contact"
import Stores from "./pages/Stores"
import Individual from "./pages/individual"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ContactUs from "./pages/Contactus"
import Aboutus from "./pages/Aboutus"
import { Toaster } from "sonner"
import { Header } from "./pages/Header"
import Booking from "./pages/Booking"
import RegisterRentee from "./pages/RegisterRentee"
import RegisterVehicle from "./pages/RegisterVehcile"
import PaymentFailed from "./pages/PaymentFailed"
import PaymentForm from "./pages/PaymentForm"
import PaymentSuccess from "./pages/PaymentSuccess"


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: false,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
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
        element: <Booking />,
      },
      {
        path: "registerrentee",
        element: <RegisterRentee />,
      },
      {
        path: "registervehicle",
        element: <RegisterVehicle />,
      },
      {
        path: "paymentfailed",
        element: <PaymentFailed />,
      },
      {
        path: "paymentform",
        element: <PaymentForm />,
      },
      {
        path: "paymentsuccess",
        element: <PaymentSuccess />,
      },
    
    
    ],
  },
]);


function App() {


  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
      <Toaster richColors position="top-right" />

    </>
  );
}

export default App
