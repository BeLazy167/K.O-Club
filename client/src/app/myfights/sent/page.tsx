// components/ConfirmedFights.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SentFight } from "~/@types/sentfight.type";
import Loading from "~/app/loading";
import FightCard from "~/components/fight-card";
import { Fightcardv2 } from "~/components/fightcardv2";
import { Unauthorized } from "~/components/unauthorized";
const fetchSentFights = async () => {
  const response = await fetch("/api/fight/sent");
  if (!response.ok) {
    throw new Error("Failed to fetch confirmed fights");
  }
  return response.json() as Promise<SentFight[]>;
};

export default function ConfirmedFights() {
  const { data: session } = useSession();
  const {
    data: fights,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sent-fights", session?.user?.id],
    queryFn: fetchSentFights,
    enabled: !!session,
  });
  if (!session) {
    return <Unauthorized />;
  }
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const current = {
    id: session?.user?.id ?? "",
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    image: session?.user?.image ?? "",
    username: session?.user?.username ?? "",
  };
  const fightType = "sent";
  return (
    <div className="mt-4">
      {fights?.length !== 0 ? (
        <h1 className="mb-8 text-center text-4xl font-bold">Sent Requests</h1>
      ) : (
        <h1 className="mb-8 text-center text-4xl font-bold">No Requests</h1>
      )}
      <div className="flex flex-col-reverse items-center">
        {fights?.map((fight: SentFight) => (
          <Fightcardv2
            key={fight.id}
            fight={{ fightData: fight, current, fightType }}
          />
        ))}
      </div>
    </div>
  );
}
