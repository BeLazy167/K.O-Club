// VotingVisuals.tsx
"use client";
import { useEffect, useState } from "react";
import { User } from "~/@types/user.type";
import { Vote } from "~/@types/vote.type";

export function VotingVisuals({
  votes,
  author,
  challenged,
}: {
  votes: Vote[];
  author: User;
  challenged: User;
}) {
  // State variables to store the data and calculations
  const [data, setData] = useState<Record<string, number>>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [authorVotes, setAuthorVotes] = useState(0);
  const [challengedVotes, setChallengedVotes] = useState(0);
  const [authorPercentage, setAuthorPercentage] = useState(0);
  const [challengedPercentage, setChallengedPercentage] = useState(0);

  useEffect(() => {
    // Calculate the voting data and percentages whenever the votes, author, or challenged user changes
    const newData = votes.reduce(
      (acc, vote) => {
        acc[vote.votedForId] = (acc[vote.votedForId] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const newTotalVotes = votes.length;
    const newAuthorVotes = newData[author.id] ?? 0;
    const newChallengedVotes = newData[challenged.id] ?? 0;
    const newAuthorPercentage = (newAuthorVotes / newTotalVotes) * 100;
    const newChallengedPercentage = 100 - newAuthorPercentage;

    // Update the state variables with the new data and calculations
    setData(newData);
    setTotalVotes(newTotalVotes);
    setAuthorVotes(newAuthorVotes);
    setChallengedVotes(newChallengedVotes);
    setAuthorPercentage(newAuthorPercentage);
    setChallengedPercentage(newChallengedPercentage);
  }, [votes, author.id, challenged.id]);

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">Vote Comparison</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold">{author.username}</h3>
          <div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-6 rounded-full bg-blue-600 transition-all duration-500 ease-in-out"
              style={{ width: `${authorPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-sm font-medium">
            {authorPercentage.toFixed(1)}% ({authorVotes} votes)
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">{challenged.username}</h3>
          <div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-6 rounded-full bg-green-600 transition-all duration-500 ease-in-out"
              style={{ width: `${challengedPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-sm font-medium"></div>
          {challengedPercentage.toFixed(1)}% ({challengedVotes} votes)
        </div>
      </div>
    </div>
  );
}
