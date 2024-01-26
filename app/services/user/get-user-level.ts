// File: get-employee-level.server.ts
import { prisma } from "~/db.server"; // Adjust the import path as per your project structure

/**
 * Fetches the employee level of a user by their ID.
 * @param userId The ID of the user whose employee level is to be fetched.
 * @returns The employee level if the user is found, or null if not found.
 */
export async function getEmployeeLevel(userId: number | string) {
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
    select: {
      employeeLevel: true, // Select only the employee level
    },
  });

  return user ? user.employeeLevel : null;
}
