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
    // If the user is not authenticated, return an unauthorized response
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  if (!userId) {
    // If the user ID is missing, return an unauthorized response
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch sent fights from the database
    const sentFights = await db
      .select({
        id: fights.id,
        title: fights.title,
        description: fights.description,
        location: fights.location,
        dateTime: fights.dateTime,
        authorAccepted: fights.authorAccepted,
        challengedAccepted: fights.challengedAccepted,
        challengedUser: {
          id: users.id,
          name: users.name,
          username: users.username,
          image: users.image,
          email: users.email,
        },
        createdAt: fights.createdAt,
      })
      .from(fights)
      .leftJoin(users, eq(fights.challengedId, users.id))
      .where(eq(fights.authorId, userId));

    // Append author details in sent fight object

    return NextResponse.json(sentFights, { status: 200 });
  } catch (error) {
    console.error("Error fetching sent fights:", error);
    // If an error occurs while fetching sent fights, return an error response
    return NextResponse.json(
      { message: "Failed to fetch sent fights" },
      { status: 500 },
    );
  }
}

// Handler for POST requests
export async function POST(request: Request) {
  // Return a "Method not allowed" response for POST requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for PUT requests
export async function PUT(request: Request) {
  // Return a "Method not allowed" response for PUT requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for DELETE requests
export async function DELETE(request: Request) {
  // Return a "Method not allowed" response for DELETE requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for PATCH requests
export async function PATCH(request: Request) {
  // Return a "Method not allowed" response for PATCH requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
