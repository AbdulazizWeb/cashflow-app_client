import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="flex w-screen min-h-screen bg-amber-200">
      <Outlet />
    </div>
  );
};
