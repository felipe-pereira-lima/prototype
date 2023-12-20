import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "../services/session.server";

// Create an instance of the authenticator, pass a Type, User,  with what

import { User } from "@prisma/client";
import { prisma } from "../db.server";

// strategies will return and will store in the session
export const authenticator = new Authenticator<User | Error | null>(
  sessionStorage,
  {
    sessionKey: "sessionKey", // keep in sync
    sessionErrorKey: "sessionErrorKey", // keep in sync
  }
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    // ...existing validation logic...
    // get the data from the form...
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // Query your database to find the user
    // For example, using Prisma:
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Verify password (you should hash and check the password securely)
    if (user && user.password === password) {
      // Return the user object matching the structure expected by Authenticator
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password, // Consider omitting the password in production for security
        role: user.role,
      };
    } else {
      throw new AuthorizationError("Bad Credentials");
    }
  })
);
