// getAllFights.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { Challenge } from "~/@types/fight.type";
import Loading from "~/app/loading";
import { FightCard } from "~/components/main-fight-card";

async function fetchAllFights() {
  const response = await fetch("/api/allFights", {
    cache: "no-store", // vercel cache-busting
  });
  if (!response.ok) {
    throw new Error("Failed to fetch fights");
  }
  return response.json() as Promise<Challenge[]>;
}

export default function GetAllFights() {
  const {
    data: challenges,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allFights"],
    queryFn: fetchAllFights,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="mt-4 flex h-screen flex-col">
        <div className="flex flex-col space-y-6">
          <div className="text-center text-2xl font-bold">
            Oops! Something went wrong!
          </div>
          <div className="mt-4 text-center text-lg">
            We are sorry, but we are unable to fetch the fights at the moment.
          </div>
          <div className="mt-2 text-center text-lg">
            Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-row-reverse">
      {challenges?.map((challenge: Challenge) => {
        return <FightCard key={challenge.id} challenge={challenge} />;
      })}
    </div>
  );
}
