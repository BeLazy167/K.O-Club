// components/Recieved.tsx
"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { RecievedFight } from "~/@types/recieved.type";
import Loading from "~/app/loading";
import FightCard from "~/components/fight-card";
import { Fightcardv2 } from "~/components/fightcardv2";
import { toast } from "~/components/ui/use-toast";
import { Unauthorized } from "~/components/unauthorized";
import { queryClient } from "~/lib/queryClientSingleton";
const fetchRecievedFights = async () => {
  const response = await fetch("/api/fight/recieved");
  if (!response.ok) {
    throw new Error("Failed to fetch confirmed fights");
  }
  return response.json() as Promise<RecievedFight[]>;
};
const updateFightStatus = async (fightId: string) => {
  const response = await fetch(`/api/fight/${fightId}/accept`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Error updating fight status");
  }
};
export default function ConfirmedFights() {
  const { data: session } = useSession();
  const {
    data: fights,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recievd-fights", session?.user?.id],
    queryFn: fetchRecievedFights,
    enabled: !!session,
  });
  const { mutate: updateFightStatusUser } = useMutation({
    mutationFn: updateFightStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recievd-fights", session?.user?.id],
      });
      toast({
        title: "Fight Accepted",
        description: "You have accepted the fight",
      });
      await refetch();
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (!session) {
    return <Unauthorized />;
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
  const fightType = "recieved";

  return (
    <div className="mt-4">
      {fights?.length !== 0 ? (
        <h1 className="mb-8 text-center text-4xl font-bold">
          Received Requests
        </h1>
      ) : (
        <h1 className="mb-8 text-center text-4xl font-bold">No Requests</h1>
      )}
      <div className="flex flex-col-reverse items-center">
        {fights?.map((fight: RecievedFight) => (
          <Fightcardv2
            key={fight.id}
            fight={{
              fightData: fight,
              current,
              fightType,
              acceptFight: updateFightStatusUser,
            }}
          />
        ))}
      </div>
    </div>
  );
}
