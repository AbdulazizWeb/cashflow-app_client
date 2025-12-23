import { redirect } from "react-router";

export function rootRedirect() {
  const token = localStorage.getItem("token");
  throw redirect(token ? "/control-panel" : "/login");
}

export function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
}

export function redirectIfAuthed() {
  const token = localStorage.getItem("token");
  if (token) throw redirect("/control-panel");
  return null;
}
