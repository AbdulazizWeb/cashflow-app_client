import type { LayoutCtx } from "@/app/layouts/app-layout";
import { ControlPanelTable } from "@/features/control-panel/ui/control-panel-table";
import { Button } from "@/shared/ui/shadcn/button";
import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

export const ControlPanelPage = () => {
  const { setHeaderTitle } = useOutletContext<LayoutCtx>();

  useEffect(() => {
    setHeaderTitle("Control panel");
    return () => setHeaderTitle(null);
  }, [setHeaderTitle]);

  return (
    <div className="flex flex-col h-full w-full p-2 gap-3">
      <div className="flex justify-end shrink-0">
        <Button
          size="sm"
          className="bg-[#8d4b00] hover:bg-[#703c00] text-white"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Add wallet
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        <ControlPanelTable />
      </div>
    </div>
  );
};
