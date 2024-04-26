"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

// This component is a wrapper that provides session information to its children
const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
