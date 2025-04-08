import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./routes/routes";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

// Create a tanstack query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={routes} />
          <Toaster />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
