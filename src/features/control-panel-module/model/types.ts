import type { CurrencyType } from "@/shared/api/types";

export type CreateWalletFormValues = {
  id: symbol | string;
  name: string;
  currency: CurrencyType;
  balance: string;
};
