import { Vote } from "~/@types/vote.type";
// {"json":[{"userId":"d4e136d7-7a7b-4ea3-a0ac-e9c288982360","fightId":"cb96fd4b-404c-4026-ad82-93682534c294","votedForId":"d4e136d7-7a7b-4ea3-a0ac-e9c288982360","votedForUsername":"superman","createdAt":"2024-04-20T20:08:04.000Z"},{"userId":"0df308af-2d92-4de5-b5ed-f72333566861","fightId":"cb96fd4b-404c-4026-ad82-93682534c294","votedForId":"d4e136d7-7a7b-4ea3-a0ac-e9c288982360","votedForUsername":"superman","createdAt":"2024-04-20T20:34:28.000Z"}]}
export function votingFix(votes: Vote[]) {
  //get count of votes for each user
  const voteCount = votes.reduce(
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
}
