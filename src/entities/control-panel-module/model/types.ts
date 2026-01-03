import type { CurrencyType } from "@/shared/api/types";

export type WalletType = {
  id: symbol | string;
  name: string;
  currency: CurrencyType;
  balance: number;
};
