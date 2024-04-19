import { AvatarImage, AvatarFallback, Avatar } from "~/components/ui/avatar";
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from "~/components/ui/hover-card";
import { Card } from "~/components/ui/card";
import Link from "next/link";
import { Challenge } from "~/@types/fight.type";

interface FightCardProps {
  challenge: Challenge;
}

export function FightCard({ challenge }: FightCardProps) {
  const { id, title, description, location, dateTime, author, challenged } =
    challenge;
  const date = new Date(dateTime);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
  //@typescript-eslint/no-non-null-assertion
  const authorImage = author.image ?? "";
  const challengedImage = challenged.image ?? "";
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link className="px-4 py-12" href={`/fights/${id}`}>
        <Card className="rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <div className="flex items-center space-x-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Avatar>
                    <AvatarImage src={authorImage} />
                    <AvatarFallback>{author.username}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={authorImage} />
                      <AvatarFallback>{author.username}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">{author.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        @{author.username}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <span className="text-gray-500 dark:text-gray-400">vs</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Avatar>
                    <AvatarImage src={challengedImage} />
                    <AvatarFallback>{challenged.username}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={challengedImage} />
                      <AvatarFallback>{challenged.username}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">
                        {challenged.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        @{challenged.username}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <h2 className="text-xs text-gray-500 dark:text-gray-400">
              {author.username} VS {challenged.username}
            </h2>

            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                {formattedDate} at {formattedTime}
              </span>
              <MapPinIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400">
                {location}
              </span>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </Card>
      </Link>
    </div>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
