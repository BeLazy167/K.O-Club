import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights, fightsRelations, users, votes } from "~/server/db/schema";
import { alias } from "drizzle-orm/pg-core";

export interface VotingRequest {
  votedForId: string;
  votedForUsername: string;
}
export interface Vote {
  fightId: string;
  userId: string;
  votedForId: string;
  votedForUsername: string;
}

export async function POST(
  request: Request,
  { params }: { params: { fightId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You need to be logged in to vote for a fight" },
      { status: 401 },
    );
  }
  const { fightId } = params;
  const userId = session?.user?.id;
  const { votedForId, votedForUsername } = await request.json();
  const vote: Vote = {
    fightId,
    userId,
    votedForId,
    votedForUsername,
  };
  try {
    await db.transaction(async (trx) => {
      await db
        .insert(votes)
        .values(vote)
        .onConflictDoUpdate({
          target: [votes.userId, votes.fightId],
          set: {
            votedForId: vote.votedForId,
            votedForUsername: vote.votedForUsername,
          },
        });
    });
  } catch (error) {
    console.error("Error fetching accepted fights:", error);
    return NextResponse.json(
      { message: "Failed to fetch vote for the fight" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { fightId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You need to be logged in to vote for a fight" },
      { status: 401 },
    );
  }
  const { fightId } = params;
  const userId = session?.user?.id;
  try {
    const vote = await db
      .select()
      .from(votes)
      .where(and(eq(votes.userId, userId), eq(votes.fightId, fightId)));
    return NextResponse.json(vote);
  } catch (error) {
    console.error("Error fetching accepted fights:", error);
    return NextResponse.json(
      { message: "Failed to fetch vote for the fight" },
      { status: 500 },
    );
  }
}
