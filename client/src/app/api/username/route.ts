// Route: /api/username/route.ts
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { eq } from "drizzle-orm/sql";


// Handler function for the PUT request
export async function PUT(request: Request, response: Response) {
  // Get the server session using the provided authentication options
  const session = await getServerSession(authOptions);

  // If no session is found, return an unauthorized error response
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract the username from the request body
  const { username } = (await request.json()) as { username: string };

  // If no username is provided, return a bad request error response
  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    // Update the username in the database for the authenticated user
    const x = await db
      .update(users)
      .set({ username: username })
      .where(eq(users.id, session.user.id))
      .returning({ username: users.username });

    // Return the updated username in the response
    return NextResponse.json(
      {
        username: x[0]?.username,
      },
      { status: 200 },
    );
  } catch (error) {
    // If an error occurs during the update, log the error and return a server error response
    console.error("Error updating schema:", error);
    return NextResponse.json(
      { error: "Error updating username" },
      { status: 500 },
    );
  }
}
