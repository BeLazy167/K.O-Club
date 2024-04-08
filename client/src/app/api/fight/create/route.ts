import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { getServerSession } from "next-auth/next";
import { db } from "~/server/db";
import { authOptions } from "~/server/auth";
import { fights } from "~/server/db/schema";
import { Fight } from "~/@types/fight.type";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, location, dateTime, challengedId } =
    (await request.json()) as Fight;
  const authorId = session.user.id;

  const parsedDateTime = new Date(dateTime);

  try {
    const result = await db.insert(fights).values({
      title,
      description,
      location,
      dateTime: parsedDateTime,
      authorId,
      challengedId,
    });

    return NextResponse.json(
      { message: "Fight created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating fight:", error);
    return NextResponse.json(
      { message: "Error creating fight" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
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
