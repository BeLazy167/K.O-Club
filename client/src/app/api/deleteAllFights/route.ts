// Route: /api/deleteAllFights
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights } from "~/server/db/schema";

// Handler for GET requests
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Return unauthorized response if session or user is missing
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    // Delete all fights from the database
    //eslint-disable-next-line
    await db.delete(fights);
    // Return success response with a message
    return NextResponse.json(
      { message: "All fights deleted" },
      { status: 200 },
    );
  } catch (error) {
    // Log and return error response if an error occurs during deletion
    console.error("Error deleting all fights:", error);
    return NextResponse.json(
      { message: "Error deleting all fights" },
      { status: 500 },
    );
  }
}

// Handler for POST requests
export async function POST(request: Request) {
  // Return method not allowed response for POST requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for PUT requests
export async function PUT(request: Request) {
  // Return method not allowed response for PUT requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for DELETE requests
export async function DELETE(request: Request) {
  // Return method not allowed response for DELETE requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

// Handler for PATCH requests
export async function PATCH(request: Request) {
  // Return method not allowed response for PATCH requests
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
