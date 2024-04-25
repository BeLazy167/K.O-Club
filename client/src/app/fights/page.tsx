"use client";
export const fetchCache = "force-no-store";
import { useQuery } from "@tanstack/react-query";
import { Challenge } from "~/@types/fight.type";
import { FightCard } from "~/components/main-fight-card";
import Loading from "../loading";
async function fetchAllFights() {
  const response = await fetch("/api/allFights", {
    cache: "no-store", // vercel cache-busting
    next: {
      revalidate: 1,
    },
  });
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
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-row-reverse">
      {challenges?.map((challenge: Challenge) => {
        return <FightCard key={challenge.id} challenge={challenge} />;
      })}
    </div>
  );
}
