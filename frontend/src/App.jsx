import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Rp from "./pages";

// Actions ------
import { action as loginAction } from "./pages/auth/Login";

// Loaders ------
import { loader as layoutLoader } from "./pages/Layout";

const router = createBrowserRouter([
  { path: "/login", element: <Rp.Login />, action: loginAction },
  {
    path: "/",
    element: <Rp.Layout />,
    errorElement: <Rp.Error />,
    loader: layoutLoader,
    children: [
      { path: "change-password", element: <Rp.ChangePassword /> },
      { path: "profile", element: <Rp.Profile /> },
      {
        path: "admin",
        element: <Rp.AdminLayout />,
        errorElement: <Rp.Error />,
        children: [{ index: true, element: <Rp.AdminDashboard /> }],
      },
      {
        path: "seller",
        element: <Rp.SellerDashboard />,
        errorElement: <Rp.Error />,
        children: [{ index: true, element: <Rp.SellerDashboard /> }],
      },
      {
        path: "buyer",
        element: <Rp.BuyerDashboard />,
        errorElement: <Rp.Error />,
        children: [{ index: true, element: <Rp.BuyerDashboard /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;