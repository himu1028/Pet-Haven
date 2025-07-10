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
import PetDetails from "../Pages/PetDetails";
import DonationCampaigns from "../Pages/DonationCampaigns";
import CompaignsDetails from "../Pages/CompaignsDetails";

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
{
    path:'donationcompaigns',
    Component: DonationCampaigns
},
 { path: "/pets/:id",
      Component:PetDetails,
      loader: ({ params }) => fetch(`http://localhost:3000/pets/${params.id}`)

    },
 { path: "/donationCompaigns/:id",
      Component:CompaignsDetails,
      loader: ({ params }) => fetch(`http://localhost:3000/donationCompaigns/${params.id}`)

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