import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/shadcn/dialog";
import { Button } from "@/shared/ui/shadcn/button";

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
import { convertNumberToString, parseMoneyToNumber } from "@/shared/lib/number";
import { MoneyInput } from "@/shared/ui";
import {
  useAddWalletMutation,
  useEditWalletMutation,
} from "@/entities/control-panel-module/api/control-panel.api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/providers/store/app-store";
import { setOpen } from "@/entities/control-panel-module/model/control-panel-slice";
import type { CreateWalletFormValues } from "../model/types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export const AddOrEditWalletDialog = () => {
  const { mode, wallet, open } = useSelector(
    (state: RootState) => state.controlPanel
  );

  const isEdit = mode === "Edit";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateWalletFormValues>();
  const [addWallet] = useAddWalletMutation();
  const [editWallet] = useEditWalletMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!open) return;

    if (isEdit && wallet) {
      reset({ ...wallet, balance: convertNumberToString(wallet.balance) });
    } else {
      reset({ name: "", currency: "UZS", balance: "" });
    }
  }, [open, isEdit, wallet, reset]);

  const onSubmit: SubmitHandler<CreateWalletFormValues> = async (
    formData: CreateWalletFormValues
  ) => {
    const payload = {
      ...formData,
      balance: parseMoneyToNumber(formData.balance),
    };
    let res = null;
    try {
      if (isEdit) {
        if (!wallet) return;
        res = await editWallet(payload).unwrap();

        toast.success("Wallet edited successfully");
      } else {
        res = await addWallet(payload).unwrap();
        toast.success("Wallet added successfully");
      }
      console.log(res);

      reset();
      dispatch(setOpen(false));
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        dispatch(setOpen(v));
        if (!v) reset(); // yopilganda tozalab yuborish ixtiyoriy
      }}
    >
      {/* 🔘 Sizning buttoningiz shu yerga ko‘chadi */}

      {/* 🪟 Dialog */}
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} wallet</DialogTitle>
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
                aria-invalid={!!errors.name}
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
                dispatch(setOpen(false));
                reset();
              }}
            >
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Edit"
              ) : (
                "Add"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
