// import { type NextApiRequest, type NextApiResponse } from "next";
// import { and, eq } from "drizzle-orm/expressions";
// import { fights } from "~/server/db/schema";
// import { getServerSession } from "next-auth";
// import { authOptions } from "~/server/auth";
// import { NextResponse } from "next/server";
// import { db } from "~/server/db";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "GET") {
//     const session = await getServerSession(authOptions);

//     if (!session || !session.user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     const userId = session.user.id;
//     if (!userId) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     try {
//       const confirmedFights = await db.query.fights.findMany({
//         where: and(
//           eq(fights.authorId, userId),
//           eq(fights.authorAccepted, true),
//           eq(fights.challengedAccepted, true),
//         ),
//         with: {
//           challenged: {
//             from: fights.challengedId,
//             with: {
//               id: true,
//               name: true,
//               email: true,
//               image: true,
//               username: true,
//             },
//           },
//           author: {
//             from: fights.authorId,
//             with: {
//               id: true,
//               name: true,
//               email: true,
//               image: true,
//               username: true,
//             },
//           },
//         },
//       });

//       res.status(200).json(confirmedFights);
//     } catch (error) {
//       res.status(500).json({ message: "Failed to fetch confirmed fights" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
