import { QueryClient } from "@tanstack/react-query";

// Create a new instance of QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {}, // Configure default options for queries
  },
});
