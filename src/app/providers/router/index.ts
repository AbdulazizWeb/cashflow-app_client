import { AppLayout, AuthLayout } from "@/app/layouts";
import CashlowPage from "@/pages/cashflow-module/CashlowPage";
import { createBrowserRouter } from "react-router";
import { redirectIfAuthed, requireAuth } from "./guards";
import { LoginPage, NotFoundPage, RegisterPage } from "@/pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthLayout,
    loader: redirectIfAuthed,
    children: [
      {
        path: "/login",
        Component: LoginPage,
        loader: redirectIfAuthed,
      },
      {
        path: "/register",
        Component: RegisterPage,
        loader: redirectIfAuthed,
      },
    ],
  },
  {
    path: "/",
    Component: AppLayout,
    loader: requireAuth,
    children: [
      {
        path: "/cashflow",
        Component: CashlowPage,
      },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
