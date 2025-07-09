import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Addpet from "../Pages/Addpet";
import DashboardLayout from "../Dashboard/DashboardLayout";
import AddCompa from "../Pages/AddDonationCampaign";
import AddDonationCampaign from "../Pages/AddDonationCampaign";
import PetListing from "../Pages/PetListing";

export const router = createBrowserRouter([
 
  {
    path: "/",
    Component: RootLayout,
    children:[
{
    index: true,
    Component: Home
},
{
    path:'petlisting',
    Component: PetListing
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
      },
      {
        path:'register',
        Component:Register,
      },
    ]
  },

// dash
  {
    path: '/dashboard',
    Component:DashboardLayout,
    children:[
      {
        path:'dashboard/addPet',
        Component:Addpet,
      },
      {
        path:'dashboard/addCompa',
        Component:AddDonationCampaign,
      },
     
    ]
  },

  
]);