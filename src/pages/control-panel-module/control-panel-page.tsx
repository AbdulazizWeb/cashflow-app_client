import type { LayoutCtx } from "@/app/layouts/app-layout";
import { AddWalletDialog } from "@/features/cashbox-module/ui/add-wallet-dialog";
import { ControlPanelTable } from "@/features/control-panel/ui/control-panel-table";

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
        <AddWalletDialog />
      </div>

      <div className="flex-1 min-h-0">
        <ControlPanelTable />
      </div>
    </div>
  );
};
