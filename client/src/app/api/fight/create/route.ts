import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights } from "~/server/db/schema";
import { Fight } from "~/@types/fight.type";

// Handler for POST requests
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // If the user is not authenticated, return an unauthorized response
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Extract the necessary data from the request body
  const { title, description, location, dateTime, challengedId } =
    (await request.json()) as Fight;
  const authorId = session.user.id;

  const parsedDateTime = new Date(dateTime);

  try {
    // Insert the fight data into the database
    const result = await db.insert(fights).values({
      title,
      description,
      location,
      dateTime: parsedDateTime,
      authorId,
      challengedId,
    });

    // Return a success response
    return NextResponse.json(
      { message: "Fight created successfully" },
      { status: 201 },
    );
  } catch (error) {
    // If an error occurs during the creation of the fight, return an error response
    console.error("Error creating fight:", error);
    return NextResponse.json(
      { message: "Error creating fight" },
      { status: 500 },
    );
  }
}

// Handler for GET requests
export async function GET(request: Request) {
  // Return a "Method not allowed" response for GET requests
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
