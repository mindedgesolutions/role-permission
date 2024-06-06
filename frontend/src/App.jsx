import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Rp from "./pages";
import { store } from "./store";

// Actions ------
import { action as loginAction } from "./pages/auth/Login";

// Loaders ------
import { loader as layoutLoader } from "./pages/Layout";
import { loader as adminLayoutLoader } from "./pages/AdminLayout";

const router = createBrowserRouter([
  { path: "/", element: <Rp.Login />, action: loginAction },
  {
    path: "/",
    element: <Rp.Layout />,
    errorElement: <Rp.Error />,
    loader: layoutLoader(store),
    children: [
      { path: "forbidden", element: <Rp.Forbidden /> },
      { path: "change-password", element: <Rp.ChangePassword /> },
      { path: "profile", element: <Rp.Profile /> },
      {
        path: "admin",
        element: <Rp.AdminLayout />,
        loader: adminLayoutLoader(store),
        errorElement: <Rp.Error />,
        children: [
          { path: "dashboard", element: <Rp.AdminDashboard /> },
          { path: "users", element: <Rp.UserList /> },
          { path: "routes", element: <Rp.RouteList /> },
        ],
      },
      {
        path: "seller",
        element: <Rp.SellerDashboard />,
        errorElement: <Rp.Error />,
        children: [{ path: "dashboard", element: <Rp.SellerDashboard /> }],
      },
      {
        path: "buyer",
        element: <Rp.BuyerDashboard />,
        errorElement: <Rp.Error />,
        children: [{ path: "dashboard", element: <Rp.BuyerDashboard /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
