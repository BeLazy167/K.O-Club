// app/api/username/route.ts

import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { eq } from "drizzle-orm/sql";

export async function PUT(request: Request, response: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = (await request.json()) as { username: string };

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    const x = await db
      .update(users)
      .set({ username: username })
      .where(eq(users.id, session.user.id))
      .returning({ username: users.username });
    return NextResponse.json(x);
  } catch (error) {
    console.error("Error updating schema:", error);
    return NextResponse.json(
      { error: "Error updating username" },
      { status: 500 },
    );
  }
}
