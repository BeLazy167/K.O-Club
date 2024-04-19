"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Challenge } from "~/@types/fight.type";
import { MainFightPage } from "~/components/main-fight-page";
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
  if (!FightData || isLoading) {
    return <div>Loading...</div>;
  }
  if (!session) {
    return <div>Unauthorized</div>;
  }
  return (
    <div>
      <MainFightPage FightData={FightData} />
    </div>
  );
};

export default FightPage;
