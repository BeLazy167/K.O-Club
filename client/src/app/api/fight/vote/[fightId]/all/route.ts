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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You need to be logged in" },
      { status: 401 },
    );
  }
  const { fightId } = params;
  const userId = session?.user?.id;
  try {
    const allVotes = await db
      .select()
      .from(votes)
      .where(eq(votes.fightId, fightId));

    return NextResponse.json(allVotes);
  } catch (error) {
    console.error("Error fetching accepted fights:", error);
    return NextResponse.json(
      { message: "Failed to fetch vote for the fight" },
      { status: 500 },
    );
  }
}
