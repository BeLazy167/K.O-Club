"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// This component is a custom provider component for the Tanstack library
const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a new instance of QueryClient using useState hook
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Wrap the children components with QueryClientProvider and pass the queryClient instance as a prop
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Render the ReactQueryDevtools component to enable debugging */}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
