"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut();
  };
  if (!session) {
    return (
      <header className="flex h-14 items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <BoxingGloveIcon className="h-6 w-6" />
          <span className="sr-only">KOClub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/fights"
          >
            Fights
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/api/auth/signin/google"
          >
            Sign In
          </Link>
        </nav>
      </header>
    );
  }
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <BoxingGloveIcon className="h-6 w-6" />
        <span className="sr-only">KOClub</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/fights"
        >
          Fights
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/myfights"
        >
          My Fights
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/api/auth/signout/google"
        >
          Sign out
        </Link>
      </nav>
    </header>
  );
}

function BoxingGloveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M8.48901 17.7273H18.3556M8.48901 17.7273V21H18.3556V17.7273M8.48901 17.7273C5.20016 15.5455 3.55573 10.0909 4.10387 8.45455C4.54239 7.14545 6.47916 7.54545 7.39273 7.90909C7.39273 4.09091 9.03715 3 13.4223 3C17.8074 3 20 4.09091 20 9.54545C20 13.9091 18.9037 16.8182 18.3556 17.7273"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.39282 7.90909C7.75825 8.27272 8.81799 9 10.1335 9C11.4491 9 13.9705 9 15.0668 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.39282 7.90909C7.39282 11.7273 9.03725 12.2727 10.1335 12.2727"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
