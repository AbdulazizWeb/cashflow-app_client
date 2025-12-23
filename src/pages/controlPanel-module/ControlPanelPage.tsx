import type { LayoutCtx } from "@/app/layouts/AppLayout";
import { Button } from "@/shared/ui/shadcn/button";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

export const ControlPanelPage = () => {
  const { setHeaderTitle, setHeaderActions } = useOutletContext<LayoutCtx>();
  useEffect(() => {
    setHeaderTitle("Control panel");
    setHeaderActions(
      <>
        <Button>Cashflow </Button>
      </>
    );

    return () => {
      setHeaderTitle(null);
      setHeaderActions(null);
    };
  }, [setHeaderTitle, setHeaderActions]);

  return (
    <div className="flex flex-col gap-5 w-full h-full p-2">
      <div className="w-full h-[5%] bg-amber-100"></div>
      <div className="w-full h-[95%] bg-amber-600"></div>
    </div>
  );
};
