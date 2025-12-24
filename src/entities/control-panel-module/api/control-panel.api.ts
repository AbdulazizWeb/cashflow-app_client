import { baseApi } from "@/shared/api/base-api";

type Wallet = {
  id: string;
  name: string;
  balance: number;
};

const controlPanelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWallets: build.query<Wallet[], void>({
      query: () => ({
        url: "/wallets",
      }),
    }),
  }),
});

export const { useGetWalletsQuery } = controlPanelApi;
