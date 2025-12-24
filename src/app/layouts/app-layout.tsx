import { SidebarProvider } from "@/shared/ui/shadcn/sidebar";
import { Outlet } from "react-router";
import { useState, type ReactNode } from "react";
import { Header } from "./components/header";
import { AppSidebar } from "./components/sidebar";

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
      <div className="flex h-dvh w-full overflow-hidden">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Header headerTitle={headerTitle} headerActions={headerActions} />

          {/* ✅ main scrollsiz */}
          <main className="min-h-0 flex-1 overflow-hidden">
            <Outlet
              context={{ setHeaderTitle, setHeaderActions } satisfies LayoutCtx}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
