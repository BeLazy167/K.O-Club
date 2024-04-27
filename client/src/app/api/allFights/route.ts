// Route : /api/allFights

import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights, fightsRelations, users } from "~/server/db/schema";
import { alias } from "drizzle-orm/pg-core";

export async function GET(request: Request) {
  // Disable caching for this request

  try {
    const author = alias(users, "author");
    const challenged = alias(users, "challenged");

    // Fetch accepted fights from the database
    const acceptedFights = await db
      .select({
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
      .where(
        and(
          eq(fights.challengedAccepted, true),
          eq(fights.authorAccepted, true),
        ),
      )
      .orderBy(desc(fights.createdAt));

    // Return the accepted fights as a JSON response with status code 200
    return NextResponse.json(acceptedFights, { status: 200 });
  } catch (error) {
    console.error("Error fetching accepted fights:", error);

    // Return an error message as a JSON response with status code 500
    return NextResponse.json(
      { message: "Failed to fetch accepted fights" },
      { status: 500 },
    );
  }
}
