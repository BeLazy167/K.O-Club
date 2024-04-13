import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { fights } from "~/server/db/schema";

export async function GET(request: Request) {
  try {
    // find all fights
    const allFights = await db.select().from(fights);
    return NextResponse.json({ allFights }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all fights:", error);
    return NextResponse.json(
      { message: "Error fetching all fights" },
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
