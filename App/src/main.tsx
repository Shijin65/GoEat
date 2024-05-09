import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import Auth0ProviderNavigate from "./Auth/Auth0ProviderNavigate";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient} >
        <Auth0ProviderNavigate>
        <AppRouter />
        <Toaster  visibleToasts={1} position="top-right" richColors/>
      </Auth0ProviderNavigate>
      </QueryClientProvider> 
    </Router>
  </React.StrictMode>
);
