import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights } from "~/server/db/schema";
import { Fight } from "~/@types/fight.type";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    //eslint-disable-next-line
    await db.delete(fights);
    return NextResponse.json(
      { message: "All fights deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting all fights:", error);
    return NextResponse.json(
      { message: "Error deleting all fights" },
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
