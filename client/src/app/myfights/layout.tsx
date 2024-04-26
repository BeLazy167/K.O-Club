// app/myfights/layout.tsx
// This is the layout component for the MyFights page.
import React from "react";
import { NavigationMenuX } from "~/components/Navigation";

export default function MyFights({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto">
      <NavigationMenuX />

      {children}
    </div>
  );
}
