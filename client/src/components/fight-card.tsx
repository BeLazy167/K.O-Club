import React from "react";

import Link from "next/link";
import { SentFight } from "~/@types/sentfight.type";
import { User } from "~/@types/user.type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
export interface Fight {
  SentFight: SentFight;
  author: User;
}
const FightCard = ({ fight }: { fight: Fight }) => {
  const { title, challengedUser, dateTime, location } = fight.SentFight;
  const { author } = fight;

  return (
    <Card className="w-full max-w-screen-sm rounded-lg">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="Author"
              className="rounded-full"
              height="80"
              src={author.image || "/placeholder.svg"}
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
              width="80"
            />
            <div className="grid gap-1.5">
              <h3 className="font-semibold">{author.name}</h3>
              <p className="text-sm text-gray-500">{author.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img
              alt="Challenged User"
              className="rounded-full"
              height="80"
              src={challengedUser.image || "/placeholder.svg"}
              style={{ aspectRatio: "80/80", objectFit: "cover" }}
              width="80"
            />
            <div className="grid gap-1.5">
              <h3 className="font-semibold">{challengedUser.name}</h3>
              <p className="text-sm text-gray-500">{challengedUser.username}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Date</div>
            {/* <div>{dateTime.toDateString()}</div> */}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Time</div>
            <div>{dateTime.toLocaleTimeString()}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Location</div>
            <div>{location}</div>
          </div>
        </div>
      </CardContent>
      <CardContent className="flex justify-end border-t p-4">
        <Link href="#">
          <Button size="lg">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default FightCard;
