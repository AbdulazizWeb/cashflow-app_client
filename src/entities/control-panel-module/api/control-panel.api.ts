import { baseApi } from "@/shared/api/base-api";

interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: "UZS" | "USD";
}

const controlPanelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWallets: build.query<Wallet[], void>({
      query: () => ({
        url: "/wallets",
      }),
      providesTags: ["Wallet"],
    }),
    addWallet: build.mutation<Wallet, Omit<Wallet, "id">>({
      query: (body) => ({
        url: "wallets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
});

export const { useGetWalletsQuery, useAddWalletMutation } = controlPanelApi;
