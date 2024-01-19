import { LoaderFunction } from "@remix-run/node";
import { getSession } from "~/services/session.server";

export const isAdmin: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("sessionKey");

  if (!user || user.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 401 });
  }

  if (user.role === "ADMIN") return true;
};
