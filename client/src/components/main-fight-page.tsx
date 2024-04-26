import Link from "next/link";
import { Button } from "~/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { Challenge } from "~/@types/fight.type";
import VoteSection from "./vote-section";
import ChatSection from "./chat-section";

export function MainFightPage({
  FightData,
  session,
}: {
  FightData: Challenge;
  session: {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      username: string;
    };
  };
}) {
  if (!FightData) return <div>Loading...</div>;
  const { title, description, author, challenged, id } = FightData;
  return (
    <div key="1" className="flex min-h-screen flex-col">
      {/* Main section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            {/* Left column */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                {/* Fight title */}
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {author.name} vs {challenged.name}
                </h1>
                {/* Fight description */}
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  {title}
                </p>
                {/* Fight description (fallback if not provided) */}
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  {description ?? "No description provided."}
                </p>
              </div>
              {/* Buttons */}
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {/* Vote button */}
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#vote"
                >
                  Vote Now
                </Link>
                {/* Join chat button */}
                <Link
                  className="border-gray-20 inline-flex h-10 items-center justify-center rounded-md border bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#chat"
                >
                  Join Chat
                </Link>
              </div>
            </div>
            {/* Right column */}
            <img
              alt="Fight Poster"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src="/placeholder.svg"
              width="550"
            />
          </div>
        </div>
      </section>
      {/* Vote section */}
      <VoteSection author={author} challenged={challenged} fightId={id} />
      {/* Chat section */}
      <ChatSection
        fightId={id}
        userId={session.user.id}
        username={session.user.username}
      />
    </div>
  );
}
