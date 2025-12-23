import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./app/providers/router";
import { Provider } from "react-redux";
import { store } from "./app/providers/store/AppStore";
import App from "./app/App";
import { Toaster } from "./shared/ui/shadcn/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
        <Toaster position="top-right" expand={true} richColors theme="light" />
      </App>
    </Provider>
  </StrictMode>
);
