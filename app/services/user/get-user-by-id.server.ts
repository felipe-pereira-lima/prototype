// File: get-user-by-id.server.ts
import { prisma } from "~/db.server"; // Adjust the import path as per your project structure

/**
 * Fetches a user by their ID.
 * @param userId The ID of the user to fetch.
 * @returns The user object if found, or null if not found.
 */
export async function getUserById(userId: number | string) {
  // Convert to number if userId is a string
  const id = typeof userId === "string" ? parseInt(userId, 10) : userId;

  // Handle invalid userId
  if (isNaN(id)) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}
