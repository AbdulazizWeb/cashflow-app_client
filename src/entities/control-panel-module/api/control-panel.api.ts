import { baseApi } from "@/shared/api/base-api";
import type { WalletType } from "../model/types";

const controlPanelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWallets: build.query<WalletType[], void>({
      query: () => ({
        url: "/wallets",
      }),
      providesTags: ["Wallet"],
    }),
    addWallet: build.mutation<WalletType, Omit<WalletType, "id">>({
      query: (body: WalletType) => ({
        url: "/wallets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),
    editWallet: build.mutation<WalletType, WalletType>({
      query: (body?: WalletType) => ({
        url: `/wallets/${body?.id.toString() ?? ""}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),
    deleteWallet: build.mutation<void, string>({
      query: (id: string) => ({
        url: `wallets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
});

export const {
  useGetWalletsQuery,
  useAddWalletMutation,
  useEditWalletMutation,
  useDeleteWalletMutation,
} = controlPanelApi;
