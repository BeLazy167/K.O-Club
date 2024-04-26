import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights, fightsRelations, users, votes } from "~/server/db/schema";
import { alias } from "drizzle-orm/pg-core";

export async function GET(
  request: NextRequest,
  { params }: { params: { fightId: string } },
) {
  // Get the server session using next-auth
  const session = await getServerSession(authOptions);

  // Check if the user is logged in
  if (!session) {
    return NextResponse.json(
      { message: "You need to be logged in" },
      { status: 401 },
    );
  }

  // Extract the fightId from the request parameters
  const { fightId } = params;

  // Get the userId from the session
  const userId = session?.user?.id;

  try {
    // Fetch all votes for the specified fightId from the database
    const allVotes = await db
      .select()
      .from(votes)
      .where(eq(votes.fightId, fightId));

    // Return the fetched votes as a JSON response
    return NextResponse.json(allVotes);
  } catch (error) {
    console.error("Error fetching accepted fights:", error);

    // Return an error message as a JSON response if there was an error fetching the votes
    return NextResponse.json(
      { message: "Failed to fetch vote for the fight" },
      { status: 500 },
    );
  }
}
