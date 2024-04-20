"use client";
import { useState } from "react";
import { User } from "~/@types/user.type";
import { Vote } from "~/@types/vote.type";
import { votingFix } from "~/lib/votingFix";

export async function VotingVisuals({
  votes,
  author,
  challenged,
}: {
  votes: Vote[];
  author: User;
  challenged: User;
}) {
  if (!votes) {
    return null;
  }
  const data = votes.reduce(
    (acc, vote) => {
      if (acc[vote.votedForId]) {
        acc[vote.votedForId]++;
      } else {
        acc[vote.votedForId] = 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
  if (data) {
    const keys = Object.keys(data);
    const totalVotes = votes.length;
    const authorVotes = data[author.id] ?? 0;
    const challengedVotes = data[challenged.id] ?? 0;
    const authorPercentage = (authorVotes / totalVotes) * 100;
    const challengedPercentage = 100 - authorPercentage;

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
                className="h-6 rounded-full bg-blue-600"
                style={{
                  width: `${authorPercentage}%`,
                }}
              />
            </div>
            <div className="mt-2 text-sm font-medium">
              {authorPercentage}% ({authorVotes} votes)
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              {challenged.username}
            </h3>
            <div className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-6 rounded-full bg-green-600"
                style={{
                  width: `${challengedPercentage}%`,
                }}
              />
            </div>
            <div className="mt-2 text-sm font-medium">
              {challengedPercentage}% ({challengedVotes} votes)
            </div>
          </div>
        </div>
      </div>
    );
  }
}
