import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "../services/session.server";

import { User } from "@prisma/client";
import { prisma } from "../db.server";

export const authenticator = new Authenticator<User | Error | null>(
  sessionStorage,
  {
    sessionKey: "sessionKey",
    sessionErrorKey: "sessionErrorKey",
  }
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Verify password
    if (user && user.password === password) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        employeeLevel: user.employeeLevel,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        password: user.password,
        companyId: user.companyId,
        teamId: user.teamId ?? null,
      };
    } else {
      throw new AuthorizationError("Bad Credentials");
    }
  })
);
