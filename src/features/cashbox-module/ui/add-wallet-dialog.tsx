import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/shadcn/dialog";
import { Button } from "@/shared/ui/shadcn/button";
import { Wallet } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/shared/ui/shadcn/field";
import { Input } from "@/shared/ui/shadcn/input";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/shadcn/select";
import { parseMoneyToNumber } from "@/shared/lib/number";
import { MoneyInput } from "@/shared/ui";
import { useAddWalletMutation } from "@/entities/control-panel-module/api/control-panel.api";
import { toast } from "sonner";

type Currency = "USD" | "UZS";

type FormFields = {
  name: string;
  currency: Currency;
  balance: string;
};

export function AddWalletDialog() {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormFields>();
  const [addWallet] = useAddWalletMutation();

  const onSubmit: SubmitHandler<FormFields> = async (formData: FormFields) => {
    const payload = {
      ...formData,
      balance: parseMoneyToNumber(formData.balance),
    };
    try {
      const res = await addWallet(payload).unwrap();
      console.log(res);

      toast.success("Wallet successfully added");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 🔘 Sizning buttoningiz shu yerga ko‘chadi */}
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-[#8d4b00] hover:bg-[#703c00] text-white"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Add wallet
        </Button>
      </DialogTrigger>

      {/* 🪟 Dialog */}
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>Add wallet</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="name">Name of wallet</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter the name"
                aria-describedby={undefined}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>
            <Field className="gap-1 mt-5">
              <FieldLabel htmlFor="currency">Currency</FieldLabel>
              <Controller
                control={control}
                name="currency"
                defaultValue="UZS"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UZS">UZS</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="balance">Initial balance</FieldLabel>
              <Controller
                control={control}
                name="balance"
                defaultValue=""
                render={({ field }) => (
                  <MoneyInput value={field.value} onChange={field.onChange} />
                )}
              />
            </Field>
          </Field>

          <DialogFooter className="mt-7">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "loading..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
