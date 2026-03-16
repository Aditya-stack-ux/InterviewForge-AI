import {createBrowserRouter} from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login.jsx"
import Protected from "./features/auth/components/Protected.jsx"
import Home from "./features/interview/pages/Home.jsx"
import Interview from "./features/interview/pages/Interview.jsx"
import Layout from "./Layout.jsx"
import LandingPage from "./components/LandingPage.jsx"



export const router = createBrowserRouter([
  {
    element: <Layout />,   // parent layout
    children: [
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path: "/dashboard",
        element: <Protected><Home /></Protected>
      },
      {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
])
