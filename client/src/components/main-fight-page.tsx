import Link from "next/link";
import { Button } from "~/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { Challenge } from "~/@types/fight.type";
import VoteSection from "./vote-section";

export function MainFightPage({ FightData }: { FightData: Challenge }) {
  if (!FightData) return <div>Loading...</div>;
  const { title, description, author, challenged, id } = FightData;
  return (
    <div key="1" className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {author.name} vs {challenged.name}
                </h1>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  {title}
                </p>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  {description ?? "No description provided."}
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#vote"
                >
                  Vote Now
                </Link>
                <Link
                  className="border-gray-20 inline-flex h-10 items-center justify-center rounded-md border bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#chat"
                >
                  Join Chat
                </Link>
              </div>
            </div>
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
      <VoteSection author={author} challenged={challenged} fightId={id} />
      <section className="w-full py-12 md:py-24 lg:py-32" id="chat">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-gray-100 p-4 shadow dark:bg-gray-800">
          <ScrollArea className="h-96">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 minutes ago
                  </p>
                  <p>Hey, how is it going?</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1 minute ago
                  </p>
                  <p>Not bad, just getting ready for the big fight tonight!</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Avatar>
                  <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Just now
                  </p>
                  <p>
                    Yeah, it is going to be an epic match! Who are you rooting
                    for?
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
          <div className="mt-4 flex items-center gap-2">
            <Textarea
              className="h-16 flex-1"
              placeholder="Type your message here..."
            />
            <Button>
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
