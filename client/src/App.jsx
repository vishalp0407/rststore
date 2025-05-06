import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
// Private Route
import PrivateRoute from "@components/PrivateRoute";

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
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
      />
    </Provider>
  );
};

export default App;
