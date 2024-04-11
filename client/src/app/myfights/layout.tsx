import Link from "next/link";

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
