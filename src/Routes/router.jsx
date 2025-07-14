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

import PetListing from "../Pages/PetListing";
import PetDetails from "../Pages/PetDetails";
import DonationCampaigns from "../Pages/DonationCampaigns";
import CompaignsDetails from "../Pages/CompaignsDetails";
import MyPets from "../Pages/Mypets";
import UpdateMyPets from "../Pages/UpdateMyPets";
import AddDonationCampaign from "../Pages/AddDonationCampaign";
import MyDonationCampaigns from "../Pages/MyDonationCampaigns";
import UpdateMyCampaigns from "../Pages/UpdateMyCampaigns";
import AdoptionRequest from "../Pages/AdoptionRequests";
import MyDonations from "../Pages/MyDonations";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/AllUsers";
import AllPets from "../Pages/AllPets";
import UpdateAllpets from "../Pages/UpdateAllpets";
import AllCampaigns from "../Pages/AllCampaigns";
import EditCampaigns from "../Pages/EditCampaigns";

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
{
        path:'/mypets/:id',
        element:<PrivateRoute><UpdateMyPets></UpdateMyPets></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/pets/${params.id}`)
      },
{
        path:'/edit-donation/:id',
        element:<PrivateRoute><UpdateMyCampaigns></UpdateMyCampaigns></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:3000/donationCompaigns/${params.id}`)
      },



 { path: "/pets/:id",
      Component:PetDetails,
      loader: ({ params }) => fetch(`http://localhost:3000/pets/${params.id}`)

    },
 { path: "/donationCompaigns/:id",
      Component:CompaignsDetails,
      loader: ({ params }) => fetch(`http://localhost:3000/donationCompaigns/${params.id}`)

    },
    {
path:'edit-donations/:id',
element:<EditCampaigns></EditCampaigns>,
     loader: ({ params }) => fetch(`http://localhost:3000/donationCompaigns/${params.id}`)
},
 { path: "/update-pet/:id",
      Component:UpdateAllpets,
      loader: ({ params }) => fetch(`http://localhost:3000/pets/${params.id}`)

    },
 { path: "/redonationCompaigns/:id",
      Component:CompaignsDetails,
      
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
        element:<PrivateRoute><Addpet></Addpet></PrivateRoute>
      },
      {
        path:'dashboard/mypets',
       element:<PrivateRoute><MyPets></MyPets></PrivateRoute>,
      },
      {
        path:'dashboard/adddonationscampaigns',
        element:<PrivateRoute><AddDonationCampaign></AddDonationCampaign></PrivateRoute>,
      },
      {
        path:'dashboard/mydonationcampaign',
        element:<PrivateRoute><MyDonationCampaigns></MyDonationCampaigns></PrivateRoute>,
      },
      {
        path:'dashboard/adoptionrequest',
        element:<PrivateRoute><AdoptionRequest></AdoptionRequest></PrivateRoute>,
      },
      {
        path:'dashboard/mydonations',
         element:<PrivateRoute><MyDonations></MyDonations></PrivateRoute>,
      },
      {
        path:'dashboard/allusers',
         element:<AllUsers></AllUsers>,
      },
      {
        path:'dashboard/allpetts',
         element:<AllPets></AllPets>,
      },
      {
        path:'dashboard/alldonationcampaigns',
         element:<AllCampaigns></AllCampaigns>,
      },
      

      
      
     
    ]
  },

  
]);