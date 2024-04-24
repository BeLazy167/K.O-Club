"use client";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Challenge } from "~/@types/fight.type";
import { FightCard } from "~/components/main-fight-card";
import Loading from "../loading";
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
    refetchOnWindowFocus: true,
    refetchInterval: 4000,
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {challenges?.map((challenge: Challenge) => {
        return <FightCard key={challenge.id} challenge={challenge} />;
      })}
    </div>
  );
}
