import { LoaderFunction } from "@remix-run/node";
import { getSession } from "~/services/session.server";

export const isSupervisor: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("sessionKey");

  if (!user || user.role !== "SUPERVISOR") {
    return new Response("Unauthorized", { status: 401 });
  }

  if (user.role === "SUPERVISOR") return true;
};
