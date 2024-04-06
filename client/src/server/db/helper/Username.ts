import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
// Function to get or create a user's nickname with improved efficiency and transaction use
export async function returnUsername(userId: string) {
  // Using a transaction for atomic operations
  return await db.transaction(async (tx) => {
    // Selecting only the nickname field for efficiency
    const dbUser = await tx
      .select({ username: users.username })
      .from(users)
      .where(eq(users.id, userId))
      .execute();

    return dbUser[0]?.username;
  });
}
