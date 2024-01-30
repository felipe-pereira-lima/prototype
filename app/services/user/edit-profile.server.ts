import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db.server";
import { getUserById } from "~/services/user/get-user-by-id.server";

export const loader: LoaderFunction = async ({ params }) => {
  const employeeId = params.employeeId;
  const user = await getUserById(employeeId ?? "");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const action: ActionFunction = async ({ request, params }) => {
  const employeeId = parseInt(params.employeeId ?? "", 10);
  const formData = await request.formData();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await prisma.user.update({
    where: { id: employeeId },
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
};
