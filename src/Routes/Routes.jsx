import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "@/Pages/ErrorPage";
import Home from "@/Pages/Home/Home";
import Dashboard from "@/Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Statistics from "@/Pages/Dashboard/Admin/Statistics";
import AdminRoute from "./AdminRoute";
import AllUsers from "@/Pages/Dashboard/Admin/AllUsers";
import AllParcels from "@/Pages/Dashboard/Admin/AllParcels";
import AllDeliveryMan from "@/Pages/Dashboard/Admin/AllDeliveryMan";
import DeliveryManRoute from "./DeliveryManRoute";
import MyDeliveryList from "@/Pages/Dashboard/DeliveryMan/MyDeliveryList";
import MyReviews from "@/Pages/Dashboard/DeliveryMan/MyReviews";
import BookParcel from "@/Pages/Dashboard/Users/BookParcel";
import MyParcel from "@/Pages/Dashboard/Users/MyParcel";
import MyProfile from "@/Pages/Dashboard/Users/MyProfile";
import Login from "@/Pages/Client/Login";
import Register from "@/Pages/Client/Register";

const router = createBrowserRouter([
  // ** Home Routing
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  // ** Dashboard Routing
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-parcels",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllParcels />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-deliveryman",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllDeliveryMan />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "deliverylist",
        element: (
          <PrivateRoute>
            <DeliveryManRoute>
              <MyDeliveryList />
            </DeliveryManRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <PrivateRoute>
            <DeliveryManRoute>
              <MyReviews />
            </DeliveryManRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "book-parcel",
        element: (
          <PrivateRoute>
            <BookParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "my-parcel",
        element: (
          <PrivateRoute>
            <MyParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
