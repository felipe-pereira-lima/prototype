import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getSession } from "../session.server";

import { json } from "@remix-run/node";

export const getDepartmentsOfCompany: LoaderFunction = async ({ request }) => {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    const user = session.get("sessionKey");
    if (!user || !user.companyId) {
      throw new Error("User is not logged in or does not belong to a company.");
    }

    const companyId = user.companyId;

    const departments = await prisma.department.findMany({
      where: { companyId: companyId },
      include: {
        competencies: {
          include: {
            levels: true,
          },
        },
      },
    });

    return json(departments);
  } catch (error) {
    console.error(error);
    return json(
      { message: "An error occurred while fetching departments." },
      { status: 500 }
    );
  }
};
