import {createBrowserRouter} from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login.jsx"
import Protected from "./features/auth/components/Protected.jsx"
import Home from "./features/interview/pages/Home.jsx"
import Interview from "./features/interview/pages/Interview.jsx"



export const router = createBrowserRouter([
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview /></Protected>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    },
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/register",
        element:<Register/>
    }
])
