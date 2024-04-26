//app/fights/[fightId]/page.tsx
//dynamic page for a specific fight
"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Challenge } from "~/@types/fight.type";
import { MainFightPage } from "~/components/main-fight-page";
import { Unauthorized } from "~/components/unauthorized";
import Loading from "~/app/loading";

// Function to fetch fight data, fightId is passed as a parameter
const fetchFightData = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, fightId] = queryKey;
  const response = await fetch(`/api/fight/${fightId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch fight data");
  }

  return response.json() as Promise<Challenge>;
};

// FightPage component
const FightPage = ({
  params,
}: {
  params: {
    fightId: string;
  };
}) => {
  const { fightId } = params;
  const { data: session } = useSession();
  const { data: FightData, isLoading } = useQuery({
    queryKey: ["fight", fightId],
    queryFn: fetchFightData,
    enabled: !!session,
  });

  // If user is not logged in, show Unauthorized component
  if (!session) {
    return <Unauthorized />;
  }

  // If fight data is not available or still loading, show Loading component
  if (!FightData || isLoading) {
    return <Loading />;
  }

  // Render MainFightPage component with fight data and session information
  return (
    <div>
      <MainFightPage
        FightData={FightData}
        session={
          session as {
            user: {
              id: string;
              name: string;
              email: string;
              image: string;
              username: string;
            };
          }
        }
      />
    </div>
  );
};

export default FightPage;
