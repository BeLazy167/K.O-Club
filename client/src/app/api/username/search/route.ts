// Route: /api/username/search
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { User } from "next-auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function POST(request: Request) {
  const { query } = (await request.json()) as { query: string | null };

  try {
    const users = await searchUsers(query);
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Function to search users based on the provided query
async function searchUsers(query: string | null): Promise<User[]> {
  // If the query is null, return an empty array
  if (!query) {
    return [];
  }

  // Perform a case-insensitive search for usernames that contain the query string
  const results = await db
    .select()
    .from(users)
    .where(sql`username ilike ${`%${query}%`}`)
    .limit(10);

  return results;
}
