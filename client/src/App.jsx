import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Layout from "@components/Layout";
import HomeScreen from "@screens/Home";
import CartScreen from "@screens/Cart";
import ErrorScreen from "@screens/Error";
import ProductDetailsScreen from "@screens/ProductDetails";
import LoginScreen from "@screens/Login";
import RegisterScreen from "@screens/Register";
import ShippingScreen from "@screens/Shipping";
import PaymentScreen from "@screens/Payment";
import PlaceOrder from "@screens/PlaceOrder";
import OrderScreen from "@screens/Order";
import ProfileScreen from "@screens/ProfileScreen";
import OrderListScreen from "@screens/OrderList";
import ProductListScreen from "@screens/ProductList";
import ProductEditScreen from "@screens/ProductEdit";
import UserListScreen from "@screens/UserList";
import UserEditScreens from "@screens/UserEdit";
// Private Route
import PrivateRoute from "@components/PrivateRoute";
// ADMIN   Route
import AdminRoute from "@components/AdminRoute";

import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "/page/:pageNumber",
        element: <HomeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/shipping",
            element: <ShippingScreen />,
          },
          {
            path: "/payment",
            element: <PaymentScreen />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrder />,
          },
          {
            path: "/order/:id",
            element: <OrderScreen />,
          },
          {
            path: "/profile",
            element: <ProfileScreen />,
          },
        ],
      },

      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "/admin/orderlist",
            element: <OrderListScreen />,
          },
          {
            path: "/admin/productlist",
            element: <ProductListScreen />,
          },
          {
            path: "/admin/product/:id/edit",
            element: <ProductEditScreen />,
          },
          {
            path: "/admin/userlist",
            element: <UserListScreen />,
          },
          {
            path: "/admin/user/:id/edit",
            element: <UserEditScreens />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={{ currency: "USD" }}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
        />
      </PayPalScriptProvider>
    </Provider>
  );
};

export default App;
