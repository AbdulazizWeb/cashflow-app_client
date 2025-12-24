import { SidebarTrigger } from "@/shared/ui/shadcn/sidebar";
import type { ReactNode } from "react";

type PropType = {
  headerTitle: ReactNode;
  headerActions: ReactNode;
};

export const Header = ({ headerTitle, headerActions }: PropType) => {
  return (
    <header className="h-10 shrink-0 border-b bg-[#003663] flex items-center px-2">
      <SidebarTrigger />
      <div className="flex w-full items-center justify-between gap-2">
        <h1 className="truncate font-semibold text-md ml-5 text-[#ffffff]">
          {headerTitle}
        </h1>
        <div className="flex items-center gap-2">{headerActions}</div>
      </div>
    </header>
  );
};
