//Route: /fight/:fightId/accept
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights } from "~/server/db/schema";
import { users } from "~/server/db/schema";

/**
 * Handles the GET request to accept a fight.
 *
 * @param request - The request object.
 * @param params - The parameters object containing the fightId.
 * @returns A JSON response indicating the success or failure of accepting the fight.
 */
export async function GET(
  request: Request,
  { params }: { params: { fightId: string } },
) {
  // Get the server session using the authOptions
  const session = await getServerSession(authOptions);

  // Check if the session or user is not available, indicating unauthorized access
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Get the user ID from the session
  const userId = session.user.id;

  // Check if the user ID is not available, indicating unauthorized access
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Get the fightId from the params object
  const { fightId } = params;

  // Check if the fightId is not available, indicating a bad request
  if (!fightId) {
    return NextResponse.json(
      { message: "Fight ID is required" },
      { status: 400 },
    );
  }

  try {
    // Update the fight record in the database to mark it as accepted
    await db
      .update(fights)
      .set({ challengedAccepted: true })
      .where(eq(fights.id, fightId));

    return NextResponse.json({ message: "Fight accepted successfully" });
  } catch (error) {
    console.error("Error accepting fight:", error);
    return NextResponse.json(
      { error: "An error occurred while accepting the fight" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function PUT(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function PATCH(request: Request) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
