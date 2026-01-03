import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WalletType } from "./types";

type ModeType = "Create" | "Edit";
type StateType = {
  open: boolean;
  mode: ModeType;
  wallet: WalletType | null;
};

const initialState: StateType = {
  open: false,
  mode: "Create",
  wallet: null,
};

const controlPanelSlice = createSlice({
  name: "control-panel",
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setMode(state, action: PayloadAction<ModeType>) {
      state.mode = action.payload;
    },
    setWallet(state, action: PayloadAction<WalletType | null>) {
      state.wallet = action.payload;
    },
  },
});

export const { setOpen, setMode, setWallet } = controlPanelSlice.actions;
export const constrolPanelReducer = controlPanelSlice.reducer;
