import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/shadcn/dropdown-menu";
import { Button } from "@/shared/ui/shadcn/button";
import { Check, LucidePencil, MoreHorizontal, Trash, X } from "lucide-react";
import type { Row } from "@tanstack/react-table";
import { useDeleteWalletMutation } from "@/entities/control-panel-module/api/control-panel.api";
import type { WalletType } from "@/entities/control-panel-module/model/types";
import { useDispatch } from "react-redux";
import {
  setMode,
  setOpen,
  setWallet,
} from "@/entities/control-panel-module/model/control-panel-slice";
import { toast } from "sonner";
import { useMemo, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverAnchor,
} from "@/shared/ui/shadcn/popover";

export const WalletActions = ({ row }: { row: Row<WalletType> }) => {
  const [deleteWallet] = useDeleteWalletMutation();
  const [confirming, setConfirming] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const ignoreOutsideOnceRef = useRef(false);

  const virtualRef = useMemo(() => {
    return {
      current: anchorRect ? { getBoundingClientRect: () => anchorRect } : null,
    };
  }, [anchorRect]);

  const dispatch = useDispatch();
  const editWalletHandler = async () => {
    dispatch(setOpen(true));
    dispatch(setMode("Edit"));
    dispatch(setWallet(row.original));
  };

  const deleteWalletHandler = async () => {
    try {
      await deleteWallet(row.original.id.toString()).unwrap();
      toast.success("Wallet deleted successfully");
    } catch (error) {
      toast.error(error ? String(error) : "An unexpected error occurred");
    }
  };

  return (
    <>
      <DropdownMenu
        open={menuIsOpen}
        onOpenChange={(v) => {
          setMenuIsOpen(v);
          // if (!v) setConfirming(false);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          // onInteractOutside={(e) => {
          //   if (confirming) e.preventDefault();
          // }}
        >
          <DropdownMenuItem
            onClick={editWalletHandler}
            className="cursor-pointer"
          >
            <LucidePencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              setAnchorRect(rect);
              setConfirming(true);
              ignoreOutsideOnceRef.current = true;
            }}
            className="cursor-pointer"
            variant="destructive"
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover open={confirming} onOpenChange={setConfirming}>
        <PopoverAnchor virtualRef={virtualRef} />
        <PopoverContent
          side="bottom"
          align="center"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            if (ignoreOutsideOnceRef.current) {
              e.preventDefault();
              ignoreOutsideOnceRef.current = false;
              return;
            }
            setConfirming(false); // ✅ haqiqiy outside bo‘lsa yopamiz
          }}
          className="
              w-56 p-2
              rounded-md border bg-popover text-popover-foreground shadow-md
              data-[state=open]:animate-in
              data-[state=open]:fade-in-0
              data-[state=open]:zoom-in-95
              data-[state=open]:slide-in-from-right-2
              data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0
              data-[state=closed]:zoom-out-95
              data-[state=closed]:slide-out-to-right-2
              pointer-events-auto
            "
        >
          <PopoverArrow className="fill-popover" />
          <div className="px-2 py-2 text-xs opacity-70 ">
            Delete this wallet?
          </div>
          <div className="flex gap-2 px-2 pb-2">
            <Button
              size="sm"
              variant="outline"
              className="w-1/2"
              onClick={() => setConfirming(false)}
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                deleteWalletHandler();
                setMenuIsOpen(false);
                setConfirming(false);
              }}
            >
              <Check className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
