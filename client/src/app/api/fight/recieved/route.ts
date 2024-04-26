import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights } from "~/server/db/schema";
import { users } from "~/server/db/schema";

// Handler for GET requests
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch received fights from the database
    const receivedFights = await db
      .select({
        id: fights.id,
        title: fights.title,
        description: fights.description,
        location: fights.location,
        dateTime: fights.dateTime,
        authorAccepted: fights.authorAccepted,
        challengedAccepted: fights.challengedAccepted,
        author: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
          email: users.email,
        },
        createdAt: fights.createdAt,
      })
      .from(fights)
      .leftJoin(users, eq(fights.authorId, users.id))
      .where(eq(fights.challengedId, userId));

    // Append author details in received fight object

    return NextResponse.json(receivedFights, { status: 200 });
  } catch (error) {
    console.error("Error fetching received fights:", error);
    return NextResponse.json(
      { message: "Failed to fetch received fights" },
      { status: 500 },
    );
  }
}

// Handler for POST requests
export async function POST(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for PUT requests
export async function PUT(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for DELETE requests
export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for PATCH requests
export async function PATCH(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
