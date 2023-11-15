"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
