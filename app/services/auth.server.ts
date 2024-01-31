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
      include: {
        roles: {
          include: {
            role: true, // This includes the Role data in the query
          },
        },
      },
    });

    // Verify password
    if (user && user.password === password) {
      const roles = user.roles.map(
        (userRoleRelation) => userRoleRelation.role.name
      );

      return {
        id: user.id,
        companyId: user.companyId,
        email: user.email,
        employeeLevel: user.employeeLevel,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        password: user.password,
        roles: roles,
        teamId: user.teamId ?? null,
        username: user.username,
        position: user.position,
      };
    } else {
      throw new AuthorizationError("Bad Credentials");
    }
  })
);
