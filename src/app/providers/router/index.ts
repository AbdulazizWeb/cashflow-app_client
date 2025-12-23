import { createBrowserRouter } from "react-router";
import { redirectIfAuthed, requireAuth, rootRedirect } from "./guards";
import { lazy } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: rootRedirect,
  },
  {
    path: "/",
    Component: lazy(() =>
      import("@/app/layouts/AuthLayout").then((module) => ({
        default: module.AuthLayout,
      }))
    ),
    loader: redirectIfAuthed,
    children: [
      {
        path: "/login",
        Component: lazy(() =>
          import("@/pages/auth/LoginPage").then((module) => ({
            default: module.LoginPage,
          }))
        ),
      },
      {
        path: "/register",
        Component: lazy(() =>
          import("@/pages/auth/RegisterPage").then((module) => ({
            default: module.RegisterPage,
          }))
        ),
      },
    ],
  },
  {
    path: "/",
    Component: lazy(() =>
      import("@/app/layouts/AppLayout").then((module) => ({
        default: module.AppLayout,
      }))
    ),
    loader: requireAuth,
    children: [
      {
        path: "/control-panel",
        Component: lazy(() =>
          import("@/pages/controlPanel-module/ControlPanelPage").then(
            (module) => ({
              default: module.ControlPanelPage,
            })
          )
        ),
      },
      {
        path: "/cashbox",
        Component: lazy(() =>
          import("@/pages/cashbox-module/CashboxPage").then((module) => ({
            default: module.CashboxPage,
          }))
        ),
      },
      {
        path: "/reports",
        Component: lazy(() =>
          import("@/pages/reports-module/ReportsPage").then((module) => ({
            default: module.ReportsPage,
          }))
        ),
      },
    ],
  },
  {
    path: "*",
    Component: lazy(() =>
      import("@/pages/auth/NotFoundPage").then((module) => ({
        default: module.NotFoundPage,
      }))
    ),
  },
]);
