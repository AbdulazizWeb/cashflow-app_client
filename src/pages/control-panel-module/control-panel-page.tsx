import type { LayoutCtx } from "@/app/layouts/app-layout";
import {
  setMode,
  setOpen,
  setWallet,
} from "@/entities/control-panel-module/model/control-panel-slice";
import { AddOrEditWalletDialog } from "@/features/control-panel-module/ui/add-or-edit-wallet-dialog";
import { ControlPanelTable } from "@/features/control-panel-module/ui/control-panel-table";
import { Button } from "@/shared/ui/shadcn/button";
import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router";

export const ControlPanelPage = () => {
  const { setHeaderTitle } = useOutletContext<LayoutCtx>();
  const dispatch = useDispatch();

  useEffect(() => {
    setHeaderTitle("Control panel");
    return () => setHeaderTitle(null);
  }, [setHeaderTitle]);

  const addWalletHandler = () => {
    dispatch(setOpen(true));
    dispatch(setMode("Create"));
    dispatch(setWallet(null));
  };

  return (
    <div className="flex flex-col h-full w-full p-2 gap-3">
      <div className="flex justify-end shrink-0">
        <AddOrEditWalletDialog />
        <Button
          size="sm"
          className="bg-[#8d4b00] hover:bg-[#703c00] text-white"
          onClick={addWalletHandler}
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
