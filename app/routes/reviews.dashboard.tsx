// app/routes/reviews.dashboard.tsx
import { User } from "@prisma/client";
import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Card from "~/components/ui/card";
import { ComboBox } from "~/components/ui/combo-box";
import { useUser } from "~/context/user-context";
import { prisma } from "~/db.server";
import { getSession } from "~/services/session.server";
import { getManagedEmployees } from "~/services/user/get-managed-employees";

export const loader = getManagedEmployees;

export default function ReviewDashboard() {
  const { managedEmployees } = useLoaderData<typeof loader>();
  const user = useUser();

  console.log(managedEmployees);

  return (
    <Card label="Reviews">
      {user.role === "SUPERVISOR" && (
        <div className="pb-2">
          <ComboBox
            options={managedEmployees?.map((employee: User) => ({
              id: employee.id,
              label: employee.fullName,
            }))}
            valueKey={(option: any) => option.id}
            valueLabel={(option) => option.label}
            onSelection={(newValue) => {
              // setSelectedEmployeeId(newValue ? newValue.id : undefined);
              console.log(newValue);
            }}
            placeholder="Select an employee"
          />
        </div>
      )}
    </Card>
  );
}
