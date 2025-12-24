import { CashboxTable } from "@/features/cashbox-module/ui/cashbox-table";
import { Button } from "@/shared/ui/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn/select";
import { ArrowLeftRight } from "lucide-react";

export const CashboxPage = () => {
  return (
    <div className="flex flex-col gap-3 w-full h-full p-2">
      <div className="w-full h-[5%] bg-white flex justify-end gap-2">
        <Button
          size={"sm"}
          variant={"default"}
          className="bg-[#038050]/90 hover:bg-[#016e44] text-white"
        >
          <ArrowLeftRight />
          Add transaction
        </Button>
        <Select>
          <SelectTrigger size="sm" className="w-45">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[95%] bg-white rounded-md">
        <CashboxTable />
      </div>
    </div>
  );
};
