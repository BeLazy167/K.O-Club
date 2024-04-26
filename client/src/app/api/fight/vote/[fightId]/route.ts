// Route: /api/fight/vote/:fightId
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights, fightsRelations, users, votes } from "~/server/db/schema";
import { alias } from "drizzle-orm/pg-core";
import { Vote, VotingRequest } from "~/@types/vote.type";

// Handler for the POST request
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
  const { votedForId, votedForUsername } =
    (await request.json()) as VotingRequest;
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
    return NextResponse.json(vote);
  } catch (error) {
    console.error("Error fetching accepted fights:", error);
    return NextResponse.json(
      { message: "Failed to fetch vote for the fight" },
      { status: 500 },
    );
  }
}

// Handler for the GET request
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
    if (vote.length === 0) {
      return NextResponse.json(vote);
    }
    return NextResponse.json(vote[0]);
  } catch (error) {
    console.error("Error fetching accepted fights:", error);
    return NextResponse.json(
      { message: "Failed to fetch vote for the fight" },
      { status: 500 },
    );
  }
}
