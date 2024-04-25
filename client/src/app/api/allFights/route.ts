import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights, fightsRelations, users } from "~/server/db/schema";
import { alias } from "drizzle-orm/pg-core";
import { unstable_noStore as no_store } from "next/cache";
export async function GET(request: Request) {
  no_store();
  try {
    const author = alias(users, "author");
    const challenged = alias(users, "challenged");
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
    return NextResponse.json(acceptedFights, { status: 200 });
  } catch (error) {
    console.error("Error fetching accepted fights:", error);
    return NextResponse.json(
      { message: "Failed to fetch accepted fights" },
      { status: 500 },
    );
  }
}
