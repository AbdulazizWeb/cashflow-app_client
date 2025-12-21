import { redirect } from "react-router";

export function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) throw redirect("/login");
  return null;
}

export function redirectIfAuthed() {
  const token = localStorage.getItem("token");
  if (token) throw redirect("/cashflow");
  return null;
}
