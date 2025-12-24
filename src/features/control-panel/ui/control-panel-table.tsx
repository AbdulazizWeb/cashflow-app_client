import { DataTable } from "@/shared/ui/data-table";
import { columns, type Wallet } from "../model/column";
import { useOutletContext } from "react-router";
import type { LayoutCtx } from "@/app/layouts/app-layout";
import { useEffect } from "react";
import { useGetWalletsQuery } from "@/entities/control-panel-module/api/control-panel.api";

export const ControlPanelTable = () => {
  const { setHeaderTitle } = useOutletContext<LayoutCtx>();

  useEffect(() => {
    setHeaderTitle("Control Panel");
    return () => setHeaderTitle(null);
  }, [setHeaderTitle]);
  const { data: wallets = [] } = useGetWalletsQuery<{ data: Wallet[] }>();
  console.log("resppp", wallets);

  return <DataTable columns={columns} data={wallets} />;
};
