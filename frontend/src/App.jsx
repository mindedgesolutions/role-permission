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
          {
            path: "users",
            children: [
              { path: "all", element: <Rp.UserList /> },
              { path: "providers", element: <Rp.SellerList /> },
              { path: "buyers", element: <Rp.BuyerListAdmin /> },
            ],
          },
          { path: "routes", element: <Rp.RouteList /> },
        ],
      },
      {
        path: "provider",
        element: <Rp.SellerLayout />,
        errorElement: <Rp.Error />,
        children: [
          { path: "dashboard", element: <Rp.SellerDashboard /> },
          { path: ":slug/:uuid/buyers", element: <Rp.BuyerListProvider /> },
        ],
      },
      {
        path: "buyer",
        element: <Rp.BuyerDashboard />,
        errorElement: <Rp.Error />,
        children: [{ path: "dashboard", element: <Rp.BuyerDashboard /> }],
      },
      {
        path: "posts",
        children: [
          { path: "all", element: <Rp.AdList /> },
          { path: "add", element: <Rp.AddEditAd /> },
          { path: "edit/:uuid", element: <Rp.AddEditAd /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
