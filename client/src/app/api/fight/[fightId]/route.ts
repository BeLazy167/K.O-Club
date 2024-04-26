import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights, fightsRelations, users } from "~/server/db/schema";
import { alias } from "drizzle-orm/pg-core";

export async function GET(
  request: Request,
  { params }: { params: { fightId: string } },
) {
  const { fightId } = params;

  try {
    // Create aliases for the 'users' table to differentiate between the author and the challenged user
    const author = alias(users, "author");
    const challenged = alias(users, "challenged");

    // Fetch the fight data along with the author and challenged user details
    const FightData = await db
      .selectDistinct({
        id: fights.id,
        title: fights.title,
        description: fights.description,
        location: fights.location,
        dateTime: fights.dateTime,
        createdAt: fights.createdAt,
        author: {
          id: author.id,
          name: author.name,
          username: author.username,
          image: author.image,
          email: author.email,
        },
        challenged: {
          id: challenged.id,
          name: challenged.name,
          username: challenged.username,
          image: challenged.image,
          email: challenged.email,
        },
      })
      .from(fights)
      .leftJoin(author, eq(fights.authorId, author.id))
      .leftJoin(challenged, eq(fights.challengedId, challenged.id))
      .where(eq(fights.id, fightId));

    // Return the first fight data object as a JSON response with a status code of 200
    return NextResponse.json(FightData[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching accepted fights:", error);
    // Return an error message as a JSON response with a status code of 500
    return NextResponse.json(
      { message: "Failed to fetch accepted fights" },
      { status: 500 },
    );
  }
}
