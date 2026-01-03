import { authReducer } from "@/entities/auth/model/auth-slice";
import { constrolPanelReducer } from "@/entities/control-panel-module/model/control-panel-slice";
import { baseApi } from "@/shared/api/base-api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    controlPanel: constrolPanelReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
