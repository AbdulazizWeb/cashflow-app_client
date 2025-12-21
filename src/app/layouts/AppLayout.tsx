import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div className="w-full h-screen">
      <header>Hello world!</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
