export interface Vote {
  fightId: string;
  userId: string;
  votedForId: string;
  votedForUsername: string;
}
export interface VotingRequest {
  votedForId: string;
  votedForUsername: string;
}
export interface VoteResponse {
  fightId: string;
  userId: string;
  votedForId: string;
  votedForUsername: string;
  createdAt: string;
}
