import { SidebarProvider, SidebarTrigger } from "@/shared/ui/shadcn/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "./components/Sidebar";
import { useState, type ReactNode } from "react";

type Slot = ReactNode;
export type LayoutCtx = {
  setHeaderTitle: (node: Slot) => void;
  setHeaderActions: (node: Slot) => void;
};

export const AppLayout = () => {
  const [headerTitle, setHeaderTitle] = useState<Slot>(null);
  const [headerActions, setHeaderActions] = useState<Slot>(null);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <AppSidebar />

        {/* content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="h-14 shrink-0 border-b bg-gray-300 flex items-center px-2">
            <SidebarTrigger />
            <div className="flex w-full items-center justify-between gap-2">
              <h1 className="truncate font-semibold text-md ml-5">
                {headerTitle}
              </h1>
              <div className="flex items-center gap-2">{headerActions}</div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-auto">
            <Outlet
              context={{ setHeaderTitle, setHeaderActions } satisfies LayoutCtx}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
