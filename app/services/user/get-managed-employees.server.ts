import { LoaderFunction, json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getSession } from "~/services/session.server";

export const getManagedEmployees: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const sessionUser = session.get("sessionKey");

  if (!sessionUser) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Fetch the user's roles
  const userWithRoles = await prisma.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!userWithRoles) {
    return new Response("User not found", { status: 404 });
  }

  // Check if the user is a supervisor or an admin
  const isAuthorized = userWithRoles.roles.some((role) =>
    ["SUPERVISOR", "ADMIN"].includes(role.role.name)
  );

  if (!isAuthorized) {
    return json({ managedEmployees: [] });
  }

  // Fetch the managed employees
  const managedEmployees = await prisma.user.findMany({
    where: {
      companyId: sessionUser.companyId,
      // Assuming you want to fetch employees that are not supervisors or admins
      roles: {
        none: {
          role: {
            name: {
              in: ["SUPERVISOR", "ADMIN"],
            },
          },
        },
      },
    },
    include: {
      reviews: {
        where: {
          supervisorId: sessionUser.id,
        },
        include: {
          competencies: true,
        },
      },
    },
  });

  return json({ managedEmployees });
};
