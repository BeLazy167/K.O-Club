import { type NextApiRequest, type NextApiResponse } from "next";
import { eq } from "drizzle-orm/expressions";
import { fights, fightsUsersRelations } from "~/server/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const receivedFights = await db.query.fights.findMany({
        where: eq(fights.challengedId, userId),
        with: {
          authorId: true,
        },
      });

      res.status(200).json(receivedFights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch received fights" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
