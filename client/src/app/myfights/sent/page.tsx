// app/myfights/sent/page.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SentFight } from "~/@types/sentfight.type";
import Loading from "~/app/loading";
import { Fightcardv2 } from "~/components/fightcardv2";
import { Unauthorized } from "~/components/unauthorized";
// Fetches the sent fights from the API
const fetchSentFights = async () => {
  const response = await fetch("/api/fight/sent");
  if (!response.ok) {
    throw new Error("Failed to fetch confirmed fights");
  }
  return response.json() as Promise<SentFight[]>;
};

// Component to display the confirmed fights
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

  // If user is not logged in, show unauthorized message
  if (!session) {
    return <Unauthorized />;
  }

  // If data is still loading, show loading component
  if (isLoading) {
    return <Loading />;
  }

  // If there is an error, show error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Prepare current user data
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
      {/* Display heading based on the number of fights */}
      {fights?.length !== 0 ? (
        <h1 className="mb-8 text-center text-4xl font-bold">Sent Requests</h1>
      ) : (
        <h1 className="mb-8 text-center text-4xl font-bold">No Requests</h1>
      )}

      {/* Display fight cards */}
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
