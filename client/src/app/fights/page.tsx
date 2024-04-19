"use client";
import { useQuery } from "@tanstack/react-query";
import { Challenge } from "~/@types/fight.type";
import { FightCard } from "~/components/main-fight-card";
async function fetchAllFights() {
  const response = await fetch("/api/allFights");
  if (!response.ok) {
    throw new Error("Failed to fetch fights");
  }
  return response.json() as Promise<Challenge[]>;
}

export default function Page() {
  const {
    data: challenges,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allFights"],
    queryFn: fetchAllFights,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {challenges?.map((challenge: Challenge) => {
        return <FightCard key={challenge.id} challenge={challenge} />;
      })}
    </div>
  );
}
