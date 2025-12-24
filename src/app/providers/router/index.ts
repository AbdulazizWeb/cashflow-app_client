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
      import("@/app/layouts/auth-layout").then((module) => ({
        default: module.AuthLayout,
      }))
    ),
    loader: redirectIfAuthed,
    children: [
      {
        path: "/login",
        Component: lazy(() =>
          import("@/pages/auth/login-page").then((module) => ({
            default: module.LoginPage,
          }))
        ),
      },
      {
        path: "/register",
        Component: lazy(() =>
          import("@/pages/auth/register-page").then((module) => ({
            default: module.RegisterPage,
          }))
        ),
      },
    ],
  },
  {
    path: "/",
    Component: lazy(() =>
      import("@/app/layouts/app-layout").then((module) => ({
        default: module.AppLayout,
      }))
    ),
    loader: requireAuth,
    children: [
      {
        path: "/control-panel",
        Component: lazy(() =>
          import("@/pages/control-panel-module/control-panel-page").then(
            (module) => ({
              default: module.ControlPanelPage,
            })
          )
        ),
      },
      {
        path: "/cashbox",
        Component: lazy(() =>
          import("@/pages/cashbox-module/cashbox-page").then((module) => ({
            default: module.CashboxPage,
          }))
        ),
      },
    ],
  },
  {
    path: "*",
    Component: lazy(() =>
      import("@/pages/auth/not-found-page").then((module) => ({
        default: module.NotFoundPage,
      }))
    ),
  },
]);
