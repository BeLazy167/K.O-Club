import { NextResponse } from "next/server";
import { eq } from "drizzle-orm/expressions";
import { getServerSession } from "next-auth";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights } from "~/server/db/schema";
import { users } from "~/server/db/schema";

export async function GET(
  request: Request,
  { params }: { params: { fightId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { fightId } = params;
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