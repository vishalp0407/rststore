import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "@components/Layout";
import HomeScreen from "@screens/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
