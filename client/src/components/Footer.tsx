import React from "react"; // Add the missing import statement

import Link from "next/link";

/**
 * Footer component.
 * Renders the footer section of the website.
 */
export default function Footer() {
  return (
    // Footer container
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      {/* Copyright text */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 KOClub. All rights reserved.
      </p>
      {/* Navigation links */}
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        {/* Terms of Service link */}
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Terms of Service
        </Link>
        {/* Privacy link */}
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
// Path: client/src/components/Footer.tsx
