import { sign } from "crypto";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LandingPage() {
  return (
    <section className="w-full   py-12 md:py-24 lg:py-32">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Your Ultimate Fighting Connection{" "}
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Connect with combat sports enthusiasts worldwide. Discover, follow
            and never miss a fight with K.O. Club.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          
        </div>
      </div>
    </section>
  );
}
