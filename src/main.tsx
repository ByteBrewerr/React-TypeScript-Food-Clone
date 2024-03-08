import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient as ReactQueryClient, QueryClientProvider as ReactQueryClientProvider } from "react-query";
import { QueryClient as TanstackQueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const reactQueryClient = new ReactQueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const tanstackQueryClient = new TanstackQueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ReactQueryClientProvider client={reactQueryClient}>
      <TanstackQueryClientProvider client={tanstackQueryClient}>
        <App />
      </TanstackQueryClientProvider>
    </ReactQueryClientProvider>
  </BrowserRouter>
);
