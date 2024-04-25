// VoteSection.tsx
"use client";
import { User } from "~/@types/user.type";
import { Button } from "./ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Vote, VotingRequest } from "~/@types/vote.type";
import { useToast } from "./ui/use-toast";
import { VotingVisuals } from "./voting-visuals";
import Loading from "~/app/loading";

const fetchPersonalVote = async (fightId: string) => {
  const response = await fetch(`/api/fight/vote/${fightId}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch personal vote data");
  }
  return response.json() as Promise<Vote>;
};

const voteFight = async (data: VotingRequest, fightId: string) => {
  const response = await fetch(`/api/fight/vote/${fightId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to vote for the fight");
  }
  return response.json() as Promise<Vote>;
};

const allVotes = async (fightId: string) => {
  const response = await fetch(`/api/fight/vote/${fightId}/all`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch vote data");
  }
  return response.json() as Promise<Vote[]>;
};

export default function VoteSection({
  fightId,
  author,
  challenged,
}: {
  author: User;
  challenged: User;
  fightId: string;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: personalVote, isLoading: isPersonalVoteLoading } = useQuery({
    queryKey: ["personalVote", fightId],
    queryFn: () => fetchPersonalVote(fightId),
    refetchOnWindowFocus: false,
  });

  const { data: votes, isLoading: isVotesLoading } = useQuery({
    queryKey: ["votes", fightId],
    queryFn: () => allVotes(fightId),
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: (data: VotingRequest) => voteFight(data, fightId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "votes",
        queryKey: ["votes", fightId],
      });
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "personalVote",
        queryKey: ["personalVote", fightId],
      });
      toast({
        title: "Vote submitted",
        description: `You voted for ${data?.votedForUsername}`,
      });
    },
  });

  if (isPersonalVoteLoading || isVotesLoading) {
    return <Loading />;
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const selected = event.currentTarget.value;
    let votedForId: string;
    let votedForUsername: string;
    if (selected === "author") {
      votedForId = author.id;
      votedForUsername = author.username ?? "";
    } else {
      votedForId = challenged.id;
      votedForUsername = challenged.username ?? "";
    }
    toast({
      title: "Submitting vote...",
      description: "Please wait a moment",
      duration: 5000,
    });
    try {
      mutate({ votedForId, votedForUsername });
    } catch (error) {
      console.error("Failed to vote for the fight:", error);
    }
  };

  return (
    <section
      className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32"
      id="vote"
    >
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Vote Now
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Who will win?
              </h2>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Cast your vote and let us know who you think will emerge
                victorious in this highly anticipated match.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className={`h-10 flex-1 items-center justify-center rounded-md bg-white px-8 text-sm font-medium shadow transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 ${
                  personalVote?.votedForId === author.id
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
                variant="ghost"
                value={"author"}
                onClick={handleClick}
                disabled={isPersonalVoteLoading || isVotesLoading || isMutating}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                {author.name} aka {author.username}
              </Button>
              <Button
                className={`h-10 flex-1 items-center justify-center rounded-md bg-white px-8 text-sm font-medium shadow transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 ${
                  personalVote?.votedForId === challenged.id
                    ? "bg-green-600 text-white"
                    : ""
                }`}
                variant="ghost"
                value={"challenged"}
                onClick={handleClick}
                disabled={isPersonalVoteLoading || isVotesLoading || isMutating}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                {challenged.name} aka {challenged.username}
              </Button>
            </div>
          </div>
          <VotingVisuals
            votes={votes ?? []}
            author={author}
            challenged={challenged}
          />
        </div>
      </div>
    </section>
  );
}
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
