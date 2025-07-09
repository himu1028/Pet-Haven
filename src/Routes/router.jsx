import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
{
    index: true,
    Component: Home
},

    
    ]
  },

// for auth
  {
    path: '/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login,
      }
    ]
  }
]);