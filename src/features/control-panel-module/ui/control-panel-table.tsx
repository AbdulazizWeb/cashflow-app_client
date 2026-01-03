import { DataTable } from "@/shared/ui/data-table";
import { columns } from "../model/column";
import { useOutletContext } from "react-router";
import type { LayoutCtx } from "@/app/layouts/app-layout";
import { useEffect } from "react";
import { useGetWalletsQuery } from "@/entities/control-panel-module/api/control-panel.api";
import type { WalletType } from "@/entities/control-panel-module/model/types";

export const ControlPanelTable = () => {
  const { setHeaderTitle } = useOutletContext<LayoutCtx>();

  useEffect(() => {
    setHeaderTitle("Control Panel");
    return () => setHeaderTitle(null);
  }, [setHeaderTitle]);
  const { data: wallets = [] } = useGetWalletsQuery<{ data: WalletType[] }>();
  // console.log("resppp", wallets);

  return <DataTable columns={columns} data={wallets} />;
};
