import { prisma } from "~/db.server";

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
