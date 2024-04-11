// components/ConfirmedFights.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SentFight } from "~/@types/sentfight.type";
import FightCard from "~/components/fight-card";
import { Fightcardv2 } from "~/components/fightcardv2";
const fetchConfirmedFights = async () => {
  const response = await fetch("/api/fight/sent");
  if (!response.ok) {
    throw new Error("Failed to fetch confirmed fights");
  }
  return response.json();
};

export default function ConfirmedFights() {
  const { data: session } = useSession();
  const {
    data: fights = [] as SentFight[],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["confirmed-fights", session?.user?.id],
    queryFn: fetchConfirmedFights,
    enabled: !!session,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!session) {
    return <div>Unauthorized</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const author = {
    id: session?.user?.id ?? "",
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    image: session?.user?.image ?? "",
    username: session?.user?.username ?? "",
  };

  return (
    <div>
      <h1>Sent Fights</h1>
      <div className="flex flex-col items-center">
        {fights.map((fight: SentFight) => (
          <Fightcardv2 key={fight.id} fight={{ SentFight: fight, author }} />
        ))}
      </div>
    </div>
  );
}
