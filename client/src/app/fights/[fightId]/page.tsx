"use client";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Challenge } from "~/@types/fight.type";
import { MainFightPage } from "~/components/main-fight-page";
import { Unauthorized } from "~/components/unauthorized";
import Loading from "~/app/loading";
const fetchFightData = async ({ queryKey }: { queryKey: [string, string] }) => {
  const [, fightId] = queryKey;
  const response = await fetch(`/api/fight/${fightId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch fight data");
  }

  return response.json() as Promise<Challenge>;
};
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
  if (!session) {
    return <Unauthorized />;
  }
  if (!FightData || isLoading) {
    return <Loading />;
  }

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
