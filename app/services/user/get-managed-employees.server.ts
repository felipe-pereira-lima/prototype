import { LoaderFunction, json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getSession } from "~/services/session.server";

export const getManagedEmployees: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("sessionKey");

  if (!user || user.role !== "SUPERVISOR") {
    return new Response("Unauthorized", { status: 401 });
  }

  const managedEmployees = await prisma.user.findMany({
    where: {
      companyId: user.companyId,
      role: "EMPLOYEE",
    },
    include: {
      reviews: {
        where: {
          supervisorId: user.id,
        },
        include: {
          competencies: true,
        },
      },
    },
  });

  return json({ managedEmployees });
};
