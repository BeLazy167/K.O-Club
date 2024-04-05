import Link from "next/link";
import LandingPage from "~/components/LandingPage";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const isAuth = false;
  return (
    // <main className=" text-whit min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
    <main>
      <LandingPage />
    </main>
  );
}
