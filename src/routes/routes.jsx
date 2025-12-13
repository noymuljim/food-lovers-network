import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Home/Register";
import AuthLayout from "../Layouts/AuthLayout";
import AddReview from "../components/AddReview";
import MyReview from "../components/MyReview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '',
        element: <Home></Home>
      },
      {
        path: '/addReview',
        element: <AddReview></AddReview>
      },
      {
        path: '/myReview',
        element: <MyReview></MyReview>
      },



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