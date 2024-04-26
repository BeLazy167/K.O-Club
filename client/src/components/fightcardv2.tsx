"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { SentFight } from "~/@types/sentfight.type";
import { User } from "~/@types/user.type";
import { RecievedFight } from "~/@types/recieved.type";

// Interface for SentFightInt
export interface SentFightInt {
  fightData: SentFight;
  current: User;
  fightType: string;
}

// Interface for RecievedFightInt
export interface RecievedFightInt {
  fightData: RecievedFight;
  current: User;
  fightType: string;
  acceptFight: (fightId: string) => void;
}

// Fightcardv2 component
export function Fightcardv2({
  fight,
}: {
  fight: SentFightInt | RecievedFightInt;
}) {
  const {
    title,
    description,
    location,
    dateTime,
    authorAccepted,
    challengedAccepted,
  } = fight.fightData;
  const { current } = fight;
  const challengedUser =
    "challengedUser" in fight.fightData
      ? fight.fightData.challengedUser
      : fight.fightData.author;
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

  return (
    <Card className="mt-4">
      {/* Card Header */}
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            {/* Card Title */}
            <CardTitle>{title}</CardTitle>
            {/* Card Description */}
            <CardDescription>
              {description ?? "No description provided."}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      {/* Card Content */}
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Current User */}
          <div className="flex items-center space-x-4">
            <img
              alt="Image"
              className="rounded-full"
              height={80}
              src={current.image ?? "/placeholder.svg"}
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{current.name}</h3>
              <p className="text-sm text-gray-500">@{current.username}</p>
              <p className="text-sm text-gray-500">{current.email}</p>
            </div>
          </div>
          {/* Challenged User */}
          <div className="flex items-center space-x-4">
            <img
              alt="Image"
              className="rounded-full"
              height={80}
              src={challengedUser.image ?? "/placeholder.svg"}
              style={{
                aspectRatio: "80/80",
                objectFit: "cover",
              }}
              width={80}
            />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{challengedUser.name}</h3>
              <p className="text-sm text-gray-500">
                @{challengedUser.username}
              </p>
              <p className="text-sm text-gray-500">{challengedUser.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {/* Date */}
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 flex-shrink-0 text-gray-500" />
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
          {/* Time */}
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-4 w-4 flex-shrink-0 text-gray-500" />
            <span className="text-sm font-medium">{formattedTime}</span>
          </div>
          {/* Location */}
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-4 w-4 flex-shrink-0 text-gray-500" />
            <span className="text-sm font-medium">{location}</span>
          </div>
        </div>
      </CardContent>
      {/* Card Footer */}
      <CardFooter className="flex justify-end">
        <div className="flex items-center space-x-2">
          {/* Fight Type */}
          {fight.fightType === "sent" ? (
            // Challenged Accepted
            challengedAccepted ? (
              <>
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Accepted</span>
              </>
            ) : (
              // Pending
              <>
                <PendingCircleIcon className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Pending</span>
              </>
            )
          ) : challengedAccepted ? (
            // Challenged Accepted
            <>
              <CheckCircleIcon className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Accepted</span>
            </>
          ) : (
            // Accept Fight Button
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if ("acceptFight" in fight) {
                  fight.acceptFight(fight.fightData.id);
                }
              }}
            >
              Accept Fight
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// Calendar Icon component
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

// Pending Circle Icon component
function PendingCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </svg>
  );
}

// Check Circle Icon component
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// Clock Icon component
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// Map Pin Icon component
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

// Path: client/src/components/fightcardv2.tsx
