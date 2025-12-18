import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Home/Register";
import AuthLayout from "../Layouts/AuthLayout";
import AddReview from "../components/AddReview";
import MyReview from "../components/MyReview";
import AllReviews from "../pages/AllReviews";
import Details from "../pages/Home/Details";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '',
        element: <Home></Home>,
        loader:()=>fetch('http://localhost:4000/latest-reviews')
      },
      {
        path: '/addReview',
        element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
      },
      {
        path: '/myReview',
        element: <PrivateRoute>
          <MyReview></MyReview>
        </PrivateRoute>
      },
      {
        path:'/allReviews',
        element:<AllReviews></AllReviews>,
        loader:()=> fetch('http://localhost:4000/reviews')
      },
      
     
      {
        path:'/revirw-Details/:id',
        element: <PrivateRoute>
          <Details></Details>
        </PrivateRoute>,
        loader:({params})=>fetch(`http://localhost:4000/reviews/${params.id}`)
      }



    ]
  },
  {
    path: '/auth',
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: '/auth/register',
        element: <Register></Register>
      }
    ]
  },


  {
    path: '*',
    element: <h1>404 here</h1>
  }

]);