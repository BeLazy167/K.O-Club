import { Vote } from "~/@types/vote.type";

export function votingFix(votes: Vote[]) {
  // Create an empty object to store the vote count for each user
  const voteCount = votes.reduce(
    (acc, vote) => {
      // Check if the user's ID already exists in the voteCount object
      if (acc[vote.votedForId]) {
        // If it exists, increment the vote count for that user
        acc[vote.votedForId]++;
      } else {
        // If it doesn't exist, initialize the vote count for that user to 1
        acc[vote.votedForId] = 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
}
